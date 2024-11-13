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
exports.organizations = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const organizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    resources: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    }
});
const Organization = mongoose_1.default.model('Organization', organizationSchema);
exports.default = Organization;
exports.organizations = [
    {
        "name": "IDF - North",
        "resources": [
            {
                "name": "Iron Dome",
                "amount": 25
            },
            {
                "name": "David's Sling",
                "amount": 15
            }
        ],
        "budget": 8000000
    },
    {
        "name": "IDF - South",
        "resources": [
            {
                "name": "Iron Dome",
                "amount": 30
            },
            {
                "name": "Patriot",
                "amount": 20
            }
        ],
        "budget": 9000000
    },
    {
        "name": "IDF - Center",
        "resources": [
            {
                "name": "Iron Dome",
                "amount": 40
            },
            {
                "name": "Arrow",
                "amount": 10
            }
        ],
        "budget": 10000000
    },
    {
        "name": "IDF - West Bank",
        "resources": [
            {
                "name": "Iron Dome",
                "amount": 10
            }
        ],
        "budget": 7000000
    },
    {
        "name": "Hezbollah",
        "resources": [
            {
                "name": "Fajr-5",
                "amount": 20
            },
            {
                "name": "Zelzal-2",
                "amount": 10
            }
        ],
        "budget": 3000000
    },
    {
        "name": "Hamas",
        "resources": [
            {
                "name": "Qassam",
                "amount": 50
            },
            {
                "name": "M-75",
                "amount": 30
            }
        ],
        "budget": 2500000
    },
    {
        "name": "IRGC",
        "resources": [
            {
                "name": "Shahab-3",
                "amount": 15
            },
            {
                "name": "Fateh-110",
                "amount": 25
            }
        ],
        "budget": 4000000
    },
    {
        "name": "Houthis",
        "resources": [
            {
                "name": "Badr-1",
                "amount": 20
            },
            {
                "name": "Quds-1",
                "amount": 15
            }
        ],
        "budget": 2000000
    }
];
