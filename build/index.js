"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
const config = require("./config/env/index");
// start server
express_1.default.listen(config.PORT, () => {
    console.info(`server started on port: ${config.PORT} (${config.NODE_ENV})`);
});
module.exports = express_1.default;
//# sourceMappingURL=index.js.map