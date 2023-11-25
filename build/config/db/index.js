"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./../env"));
// make bluebird default Promise
Promise = require('bluebird');
class MongoDB {
    constructor(options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }) {
        this._mongoose = mongoose_1.default;
        this._connectOptions = options;
        // plugin bluebird promise in mongoose
        this._mongoose.Promise = Promise;
        // connect to mongo db
        this.connect();
    }
    connect() {
        const mongoUri = env_1.default.MONGO_HOST;
        this._mongoose
            .connect(mongoUri, this._connectOptions)
            .then(() => {
            const mongoHost = mongoUri.search('localhost:27017') === -1 ? 'ATLAS' : 'Local';
            return console.log(`Successfully connected to MongoDB [${mongoHost}]`);
        })
            .catch((error) => {
            console.log('Error connecting to database: ', error);
            return process.exit(1);
        });
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=index.js.map