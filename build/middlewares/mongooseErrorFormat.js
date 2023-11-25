"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoErrorHandler = void 0;
const HttpStatus = __importStar(require("http-status-codes"));
exports.mongoErrorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.errmsg;
    if (error.name === 'MongoError' && (err.code === 11000 || err.code === 11001)) {
        const pathRegex = err.message.split('index: ')[1].split('dup key')[0].split('_')[0];
        const keyRegex = err.message.match(/key:\s+{\s+:\s\"(.*)(?=\")/);
        const value = keyRegex ? keyRegex[1] : '';
        const output = {
            message: `${pathRegex} already exists`,
            fieldName: pathRegex,
            value,
        };
        return res.status(HttpStatus.CONFLICT).json(output);
    }
    // Mongoose bad objectID
    if (error.name === 'CastError') {
        const message = `Resource not found with ID of ${error.value}`;
        return res.status(HttpStatus.NOT_FOUND).json({
            message,
        });
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        return res.status(HttpStatus.BAD_REQUEST).json({
            message,
        });
    }
    next(err);
};
//# sourceMappingURL=mongooseErrorFormat.js.map