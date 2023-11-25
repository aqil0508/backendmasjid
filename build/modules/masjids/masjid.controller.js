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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNearByMasjids = exports.getAllMasjids = exports.createMasjid = void 0;
const HttpStatus = __importStar(require("http-status-codes"));
const masjid_model_1 = require("./masjid.model");
exports.createMasjid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, contactNo, address, longitude, latitude } = req.body;
        let location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        const newMasjid = new masjid_model_1.MasjidModel({ name, contactNo, address, location });
        const masjid = yield newMasjid.save();
        return res.status(HttpStatus.CREATED).json({
            masjid: {
                _id: masjid._id,
                name: masjid.name,
                contactNo: masjid.contactNo,
                address: masjid.address,
                latitude: masjid.location.coordinates[1],
                longitude: masjid.location.coordinates[0],
                createdAt: masjid.createdAt,
                updatedAt: masjid.updatedAt,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllMasjids = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const masjids = yield masjid_model_1.MasjidModel.find({});
        const mappedMasjids = masjids.map(({ _id, name, contactNo, address, location, createdAt, updatedAt }) => {
            return {
                _id,
                name,
                contactNo,
                address,
                latitude: location.coordinates[1],
                longitude: location.coordinates[0],
                createdAt,
                updatedAt,
            };
        });
        return res.status(HttpStatus.OK).json({
            count: mappedMasjids.length,
            masjids: mappedMasjids,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllNearByMasjids = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryData = req.query;
        let { longitude, latitude, maxDistance } = queryData;
        const masjids = yield masjid_model_1.MasjidModel.find({
            location: {
                $near: {
                    $maxDistance: maxDistance,
                    $geometry: { type: 'Point', coordinates: [longitude, latitude] },
                },
            },
        });
        const mappedMasjids = masjids.map(({ _id, name, contactNo, address, location, createdAt, updatedAt }) => {
            return {
                _id,
                name,
                contactNo,
                address,
                latitude: location.coordinates[1],
                longitude: location.coordinates[0],
                createdAt,
                updatedAt,
            };
        });
        return res.status(HttpStatus.OK).json({
            count: mappedMasjids.length,
            masjids: mappedMasjids,
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=masjid.controller.js.map