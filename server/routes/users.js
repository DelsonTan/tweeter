"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const usersRoutes = express.Router();

module.exports = function (DataHelpers) {

    usersRoutes.get("/", function (req, res) {
        DataHelpers.getUsers((err, users) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(users);
            }
        });
    });

    return usersRoutes;
};