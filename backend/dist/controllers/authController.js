"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const organization_1 = __importDefault(require("../models/organization"));
const missiles_1 = __importDefault(require("../models/missiles"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
// רישום משתמש חדש
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, organization, area } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'שם משתמש כבר קיים' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const specificOrganization = yield organization_1.default.findOne({ name: organization });
        if (!specificOrganization) {
            res.status(400).json({ message: 'הארגון לא נמצא' });
            return;
        }
        const specificMissiles = yield Promise.all(specificOrganization.resources.map((missile) => __awaiter(void 0, void 0, void 0, function* () {
            const missileObject = yield missiles_1.default.findOne({ name: missile.name });
            if (missileObject) {
                missileObject.amount = missile.amount;
                return missileObject;
            }
        })));
        const newUser = new user_1.default({
            username,
            password: hashedPassword,
            organization,
            area,
            missiles: specificMissiles.filter(Boolean),
        });
        yield newUser.save();
        res.status(201).json({ message: 'המשתמש נוצר בהצלחה', newUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'שגיאה ברישום המשתמש' });
    }
});
exports.registerUser = registerUser;
//התחברות משתמש
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'שם משתמש או סיסמה לא תקינים' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'שם משתמש או סיסמה לא תקינים' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, organization: user.organization, area: user.area }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            user: { id: user._id, username: user.username, organization: user.organization, area: user.area },
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'שגיאה בהתחברות' });
    }
});
exports.loginUser = loginUser;
