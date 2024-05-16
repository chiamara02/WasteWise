const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

const User = require("../db/user").User;

const passport = require("passport");
const { checkSchema, validationResult } = require("express-validator");

const TipoUtente = require("../utils/UserType");

const taxSchema = require("../validation").taxSchema;

router.get(
    "/",
    checkSchema(taxSchema),
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next){
        const val = validationResult(req);
        if (!val.isEmpty()) {
            return errorRes(res, null, "Bad parameters", 424);
        }
        const user = await User.findOne({_id: req.user._id});
        try{
            const stato = req.query.stato;
            data = await TipoUtente.getUserType(user.userType).getTasse(req.user._id, stato);
            console.log(data)        
            successRes(res, "OK", data, 200);
        } catch (error){
            errorRes(res, error, error.message, error.code);
        }
});

module.exports = router;