const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

const User = require("../db/user").User;
const Tasse = require('../db/tasse').tasse;

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { checkSchema, validationResult } = require("express-validator");

const userSchemaSignUP = require("../validation").userSchemaSignUP;
const userSchemaLogin = require("../validation").userSchemaLogin;

const TipoUtente = require("../utils/UserType");

const { ServerResponse } = require("http");
const AnonymousUser = require("../users/AnonymousUser");

const BadRequestException = require("../exceptions/BadRequestException");
const UnauthorizedException = require("../exceptions/UnauthorizedException");


const taxSchema = require("../validation");
const NotFoundException = require("../exceptions/NotFoundException");

router.get(
    "/mostraTasse",
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next){
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


router.post(
    "/nuovaTassa",
    checkSchema(taxSchema),
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next) {
      const val = validationResult(req);
      const user = await User.findOne({_id: req.user._id});
      if(!user){errorRes(res, error, error.message, error.code);}
    }
);

module.exports = router;