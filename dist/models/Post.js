"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({});
exports.Post = mongoose_1.model('Post', PostSchema);
