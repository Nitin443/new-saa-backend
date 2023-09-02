"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function default_1() {
    let router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        res.send('Basic setup for backend is complete');
    });
    return router;
}
exports.default = default_1;
