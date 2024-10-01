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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.getTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient({ log: ["error"] });
function getTodos(substring) {
    return __awaiter(this, void 0, void 0, function () {
        var todos, todos, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!substring) return [3 /*break*/, 2];
                    console.log(substring);
                    return [4 /*yield*/, prisma.todo.findMany({
                            where: { name: { contains: substring } },
                            orderBy: { createdAt: "asc" }
                        })];
                case 1:
                    todos = _a.sent();
                    return [2 /*return*/, todos];
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.todo.findMany({
                            orderBy: { createdAt: "asc" }
                        })];
                case 3:
                    todos = _a.sent();
                    return [2 /*return*/, todos];
                case 4:
                    err_1 = _a.sent();
                    throw new Error(err_1.message);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getTodos = getTodos;
function createTodo(name) {
    return __awaiter(this, void 0, void 0, function () {
        var todo, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.todo.create({
                            data: {
                                name: name
                            }
                        })];
                case 1:
                    todo = _a.sent();
                    return [2 /*return*/, todo];
                case 2:
                    err_2 = _a.sent();
                    new Error(err_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createTodo = createTodo;
function updateTodo(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var newTodo, oldTodo, newTodo, err_3;
        var id = _b.id, newname = _b.newname;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    if (!newname) return [3 /*break*/, 2];
                    return [4 /*yield*/, prisma.todo.update({
                            where: {
                                id: id
                            },
                            data: {
                                name: newname
                            }
                        })];
                case 1:
                    newTodo = _c.sent();
                    return [2 /*return*/, newTodo];
                case 2: return [4 /*yield*/, prisma.todo.findUnique({ where: { id: id } })];
                case 3:
                    oldTodo = _c.sent();
                    return [4 /*yield*/, prisma.todo.update({ where: { id: id }, data: { completed: !oldTodo.completed } })];
                case 4:
                    newTodo = _c.sent();
                    return [2 /*return*/, newTodo];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_3 = _c.sent();
                    throw new Error(err_3.message);
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateTodo = updateTodo;
function getTodo(id) {
    return __awaiter(this, void 0, void 0, function () {
        var todo, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.todo.findUnique({ where: { id: id } })];
                case 1:
                    todo = _a.sent();
                    return [2 /*return*/, todo];
                case 2:
                    err_4 = _a.sent();
                    throw new Error(err_4.message);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getTodo = getTodo;
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function () {
        var todos, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma.todo.delete({
                            where: { id: id }
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTodos()];
                case 2:
                    todos = _a.sent();
                    return [2 /*return*/, todos];
                case 3:
                    err_5 = _a.sent();
                    throw new Error(err_5.message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteTodo = deleteTodo;
