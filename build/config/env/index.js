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
const Joi = __importStar(require("@hapi/joi"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let config = {
    NODE_ENV: '',
    PORT: 4040,
    MONGO_HOST: '',
};
// Joi validation options
const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};
dotenv.config({ path: `${__dirname}/../../../.env.production` });
// define validation for all the env vars
const envSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid(['development', 'test', 'production']).required(),
    PORT: Joi.number().valid([4040]).required(),
    MONGO_HOST: Joi.string().required(),
});
const { error, value } = envSchema.validate(process.env, _validationOptions);
if (error) {
    console.error({
        message: `Please fill up your .env.${config.NODE_ENV}`,
        name: error === null || error === void 0 ? void 0 : error.name,
        details: error === null || error === void 0 ? void 0 : error.details,
    });
    process.exit(1);
}
else {
    config = {
        NODE_ENV: value.NODE_ENV,
        PORT: parseInt(value.PORT),
        MONGO_HOST: value.MONGO_HOST,
    };
}
module.exports = config;
//# sourceMappingURL=index.js.map