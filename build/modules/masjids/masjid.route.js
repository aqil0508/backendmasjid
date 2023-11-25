"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.masjidRoutes = void 0;
const express_1 = __importDefault(require("express"));
const joiSchemaValidator_1 = require("../../middlewares/joiSchemaValidator");
const masjid_controller_1 = require("./masjid.controller");
const masjid_validation_1 = require("./masjid.validation");
const router = express_1.default.Router();
router.route('/').post(joiSchemaValidator_1.joiSchemaValidator(masjid_validation_1.createMasjidValidation), masjid_controller_1.createMasjid).get(masjid_controller_1.getAllMasjids);
router.route('/nearby').get(joiSchemaValidator_1.joiSchemaValidator(masjid_validation_1.getAllNearByMasjidsValidation), masjid_controller_1.getAllNearByMasjids);
exports.masjidRoutes = router;
//# sourceMappingURL=masjid.route.js.map