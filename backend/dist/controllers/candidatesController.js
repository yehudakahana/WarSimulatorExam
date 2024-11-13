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
exports.vote = exports.getCandidates = void 0;
const candidate_1 = __importDefault(require("../models/candidate"));
// קבלת מועמדים
const getCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield candidate_1.default.find();
        res.json(candidates);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching candidates' });
    }
});
exports.getCandidates = getCandidates;
// הצבעה למועמד
const vote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidateName } = req.body;
    try {
        const candidate = yield candidate_1.default.findOne({ name: candidateName });
        if (candidate) {
            candidate.votes += 1;
            yield candidate.save();
            res.status(201).json({ message: 'Vote updated successfully' });
        }
        else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating vote' });
    }
});
exports.vote = vote;
