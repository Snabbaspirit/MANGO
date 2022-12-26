"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = void 0;
const simple_json_db_1 = __importDefault(require("simple-json-db"));
const createDataBase = () => {
    return new simple_json_db_1.default('./data/db.json');
};
exports.createDataBase = createDataBase;
