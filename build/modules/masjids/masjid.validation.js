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
exports.getAllNearByMasjidsValidation = exports.createMasjidValidation = exports.getOneJoiObjectSchema = void 0;
const Joi = __importStar(require("@hapi/joi"));
const regex_1 = require("../../utils/regex");
exports.getOneJoiObjectSchema = (key, type, required = true) => {
    let object = {};
    let rules = Joi.string().trim();
    if (type === 'id') {
        rules = rules.regex(regex_1.IDRegex);
    }
    if (required) {
        object[key] = rules.required();
    }
    return Joi.object().keys(object);
};
// joi schema
const schema = {
    name: Joi.string().trim().min(2).max(150),
    contactNo: Joi.string().trim().max(14),
    address: Joi.string().trim().min(2).max(500),
    latitude: Joi.number().min(-90).max(90),
    longitude: Joi.number().min(-180).max(180),
    maxDistance: Joi.number().min(1000).max(100000),
};
exports.createMasjidValidation = Joi.object().keys({
    body: Joi.object().keys({
        name: schema.name.required(),
        contactNo: schema.contactNo.required(),
        address: schema.address.required(),
        latitude: schema.latitude.required(),
        longitude: schema.longitude.required(),
    }),
});
exports.getAllNearByMasjidsValidation = Joi.object().keys({
    query: Joi.object().keys({
        maxDistance: schema.maxDistance.required(),
        latitude: schema.latitude.required(),
        longitude: schema.longitude.required(),
    }),
});
//# sourceMappingURL=masjid.validation.js.map