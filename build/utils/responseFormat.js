"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = void 0;
exports.sendErrorResponse = (res, status, content, type = 'CustomError') => {
    let errorResponse = {
        status,
        type: type,
        errors: [content],
    };
    return res.status(status).json(errorResponse);
};
//# sourceMappingURL=responseFormat.js.map