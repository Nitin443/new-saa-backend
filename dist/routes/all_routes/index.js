"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth");
function default_1() {
    let router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        res.send('Basic setup for backend is complete');
    });
    router.use('/', auth_1.authRouter);
    return router;
}
exports.default = default_1;
