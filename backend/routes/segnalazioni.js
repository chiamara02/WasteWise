const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");
const passport = require("passport");
const User = require("../db/user").User;
const TipoUtente = require("../utils/UserType");
const NotFoundException = require("../exceptions/NotFoundException");
const BadRequestException = require("../exceptions/BadRequestException");

const { checkSchema, validationResult, check } = require("express-validator");
const segnalazioneSchema = require("../validation");

router.post(
    "/nuovaSegnalazione",
    checkSchema(segnalazioneSchema),
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next) {
      const val = validationResult(req);
      if (!val.isEmpty()) {
        return errorRes(res, null, "Fields required", 424);
      }
  
      const user = await User.findOne({ _id: req.user._id });
  
      try {
        idSegnalazione = await TipoUtente.getUserType(user.userType).nuovaSegnalazione(
          req.user._id,
          req.body.descrizione,
          req.body.zona,
          req.body.foto
        );
        successRes(res, "OK", idSegnalazione, 201);
      } catch (error) {
        errorRes(res, error, error.message, error.code);
      }
    }
  );

router.get(
    "/mostraSegnalazioni", 
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next) {
      const user = await User.findOne({_id: req.user._id});

      try {
        data = await TipoUtente.getUserType(user.userType).mostraSegnalazioni();
        successRes(res, "OK", data, 200);
      }  catch (error) {
        errorRes(res, error, error.message, error.code);
      }
    }
  );
  
module.exports = router;