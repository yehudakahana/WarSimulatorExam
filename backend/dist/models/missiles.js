"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.missiles = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const missileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    intercepts: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: false
    }
});
const Missile = mongoose_1.default.model('Missile', missileSchema);
exports.default = Missile;
exports.missiles = [
    {
        "name": "Iron Dome",
        "description": "A mobile all-weather air defense system designed to intercept and destroy short-range rockets and artillery shells.",
        "speed": 3,
        "intercepts": ["Qassam", "M-75", "Fajr-5", "Zelzal-2"],
        "price": 50000
    },
    {
        "name": "David's Sling",
        "description": "A mid-to-long range air defense system capable of intercepting large caliber rockets and short-range ballistic missiles.",
        "speed": 4,
        "intercepts": ["Shahab-3", "Fateh-110", "Quds-1"],
        "price": 80000
    },
    {
        "name": "Patriot",
        "description": "A long-range air defense system that intercepts tactical ballistic missiles, cruise missiles, and advanced aircraft.",
        "speed": 5,
        "intercepts": ["Shahab-3", "Zelzal-2"],
        "price": 100000
    },
    {
        "name": "Arrow",
        "description": "A family of anti-ballistic missiles designed to intercept and destroy incoming missile threats at high altitudes.",
        "speed": 5,
        "intercepts": ["Shahab-3", "Fateh-110"],
        "price": 120000
    },
    {
        "name": "Qassam",
        "description": "A simple, locally made rocket used by militant groups for attacks at relatively short distances.",
        "speed": 12,
        "intercepts": [],
        "price": 5000
    },
    {
        "name": "M-75",
        "description": "A medium-range rocket used by armed groups to target areas beyond the immediate borders.",
        "speed": 13,
        "intercepts": [],
        "price": 15000
    },
    {
        "name": "Fajr-5",
        "description": "A long-range rocket used for targeting urban centers and military installations.",
        "speed": 14,
        "intercepts": [],
        "price": 30000
    },
    {
        "name": "Zelzal-2",
        "description": "A heavy artillery rocket designed for long-distance bombardment with significant explosive power.",
        "speed": 15,
        "intercepts": [],
        "price": 45000
    },
    {
        "name": "Shahab-3",
        "description": "A medium-range ballistic missile developed for strategic strikes, capable of targeting distant locations.",
        "speed": 15,
        "intercepts": [],
        "price": 70000
    },
    {
        "name": "Fateh-110",
        "description": "A short-range ballistic missile with precision targeting capabilities.",
        "speed": 14,
        "intercepts": [],
        "price": 60000
    },
    {
        "name": "Badr-1",
        "description": "A short-range ballistic missile used by the Houthis for regional attacks.",
        "speed": 13,
        "intercepts": [],
        "price": 20000
    },
    {
        "name": "Quds-1",
        "description": "A cruise missile developed by regional forces for longer-range precision attacks.",
        "speed": 14,
        "intercepts": [],
        "price": 40000
    }
];
