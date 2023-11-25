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
exports.joiSchemaValidator = void 0;
const HttpStatus = __importStar(require("http-status-codes"));
exports.joiSchemaValidator = (_schema, useJoiError = true) => {
    // Joi validation options
    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    // return the validation middleware
    return (req, res, next) => {
        const { error, value } = _schema.validate(req, _validationOptions);
        if (error) {
            const JoiError = {
                type: 'JoiValidationError',
                status: 400,
                errors: error.details.map((e) => {
                    return {
                        message: `${e.message.replace(/['"]/g, '')}`,
                        fieldName: e.path[1],
                        path: e.path[0],
                    };
                }),
            };
            const customError = {
                error: 'Invalid request data. Please review your request and try again.',
            };
            return res.status(HttpStatus.BAD_REQUEST).json(useJoiError ? JoiError : customError);
        }
        req.body = value.body;
        req.query = value.query;
        req.params = value.params;
        next();
        return null;
    };
};
//# sourceMappingURL=joiSchemaValidator.js.map