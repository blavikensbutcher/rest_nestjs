"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
var Auth = function () { return (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard); };
exports.Auth = Auth;
