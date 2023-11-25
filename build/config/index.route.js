"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRoute = void 0;
const express_1 = __importDefault(require("express"));
const masjid_route_1 = require("../modules/masjids/masjid.route");
const router = express_1.default.Router();
router.use('/masjids', masjid_route_1.masjidRoutes);
exports.rootRoute = router;
//# sourceMappingURL=index.route.js.map