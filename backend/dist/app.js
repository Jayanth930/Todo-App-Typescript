"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var todoRouter_1 = __importDefault(require("./routes/todoRouter"));
var app = (0, express_1.default)();
var port = 3500;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use(todoRouter_1.default);
app.listen(port, function () {
    console.log("server started on port : ".concat(port));
});
