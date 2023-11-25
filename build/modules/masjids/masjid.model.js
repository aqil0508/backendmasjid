"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasjidModel = void 0;
const mongoose_1 = require("mongoose");
const masjidSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 150,
        required: true,
    },
    contactNo: {
        type: String,
        trim: true,
        maxlength: 14,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 500,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            required: true,
        },
    },
}, {
    timestamps: true,
});
//? Make sure you create index for location in 2dsphere
masjidSchema.index({ location: '2dsphere' });
exports.MasjidModel = mongoose_1.model('Masjid', masjidSchema);
//# sourceMappingURL=masjid.model.js.map