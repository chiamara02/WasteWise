const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

const User = require("../db/user").User;
const Tasse = require('../db/tasse').tasse;

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { checkSchema, validationResult } = require("express-validator");

const TipoUtente = require("../utils/UserType");

// const taxSchema = require("../validation").taxSchema;
const NotFoundException = require("../exceptions/NotFoundException");

router.get(
    "/mostraTasse",
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next){
        console.log("routes/tasse.js: /mostraTasse");
        const user = await User.findOne({_id: req.user._id});
        try{
            const stato = req.headers.stato;
            if(stato === "pagate"){
                data = await TipoUtente.getUserType(user.userType).getPaidTasse(req.user._id);
            } else if(stato === "non pagate"){
                data = await TipoUtente.getUserType(user.userType).getPendingTasse(req.user._id);
            } else {
                data = await TipoUtente.getUserType(user.userType).getAllTasse(req.user._id);
            }
           
            successRes(res, "OK", data, 200);
        } catch (error){
            errorRes(res, error, error.message, error.code);
        }
});



module.exports = router;