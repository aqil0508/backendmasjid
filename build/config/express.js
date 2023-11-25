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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const HttpStatus = __importStar(require("http-status-codes"));
const index_route_1 = require("./index.route");
const index_1 = __importDefault(require("./env/index"));
const db_1 = require("./db");
const mongooseErrorFormat_1 = require("../middlewares/mongooseErrorFormat");
const responseFormat_1 = require("../utils/responseFormat");
class App {
    constructor() {
        this._express = express_1.default();
        // connect mongoDB
        this._mongo = new db_1.MongoDB();
        this.middleware();
        this.routes();
        this.errorHandlers();
    }
    // Configure Express middleware.
    middleware() {
        // enable CORS - Cross Origin Resource Sharing
        this._express.use(cors_1.default());
        this._express.use(helmet_1.default());
        // TODO study about this options of helmet
        this._express.use(helmet_1.default.xssFilter());
        this._express.use(helmet_1.default.frameguard());
        this._express.use(helmet_1.default.noSniff());
        this._express.use(morgan_1.default(index_1.default.NODE_ENV == 'production' ? 'prod' : 'dev'));
        this._express.use(body_parser_1.default.json());
        this._express.use(body_parser_1.default.urlencoded({ extended: true }));
        this._express.use(cookie_parser_1.default());
        this._express.use(compression_1.default());
    }
    routes() {
        // home route
        this._express.get('/', (req, res, next) => {
            res.status(HttpStatus.OK).send("Masjid finder's server works successfully!!");
        });
        // application routes
        this._express.use('/api/v1', index_route_1.rootRoute);
        // API not found
        this._express.use((req, res, next) => {
            return responseFormat_1.sendErrorResponse(res, HttpStatus.NOT_FOUND, {
                message: 'API not found',
            });
        });
    }
    errorHandlers() {
        this._express.use((err, req, res, next) => {
            //? error handler
            if (err.name === 'CastError') {
                return responseFormat_1.sendErrorResponse(res, HttpStatus.BAD_REQUEST, {
                    message: err.message,
                }, 'CastError');
            }
            next(err);
        });
        // Mongo Error Handler
        this._express.use(mongooseErrorFormat_1.mongoErrorHandler);
        // handle undefined routes
        this._express.use((err, req, res, next) => {
            const stack = index_1.default.NODE_ENV === 'development' ? err.stack.split('\n') : {};
            let frame = err.stack;
            let lineNumber = frame.split(':')[1];
            res.status(err.status || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message ||
                    HttpStatus.getStatusText(err.status) ||
                    HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                stack,
                lineNumber,
                frame,
            });
        });
    }
}
exports.default = new App()._express;
//# sourceMappingURL=express.js.map