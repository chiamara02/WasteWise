const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");
const passport = require("passport");
const User = require("../db/user").User;
const UserType = require("../utils/UserType");
const NotFoundException = require("../exceptions/NotFoundException");
const BadRequestException = require("../exceptions/BadRequestException");

const { checkSchema, validationResult, check } = require("express-validator");
const prenotazioneSchema = require("../validation").prenotazioneSchema;

// Mostra le prenotazioni di un utente
router.get(
    "/getPrenotazioni", 
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next) {
      const user = await User.findOne({_id: req.user._id});

      try {
        data = await UserType.getUserType(user.userType).getPrenotazioni(user._id);
        successRes(res, "OK", data, 200);
      }  catch (error) {
        errorRes(res, error, error.message, error.code);
      }
    }
  );

  // Mostra tutte le prenotazioni di tutti gli utenti
  router.get(
    "/getAllPrenotazioni", 
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next) {
      const user = await User.findOne({_id: req.user._id});

      try {
        console.log(UserType.getUserType(user.userType));
        data = await UserType.getUserType(user.userType).getAllPrenotazioni();
        successRes(res, "OK", data, 200);
      }  catch (error) {
        errorRes(res, error, error.message, error.code);
      }
    }
  );

  // Crea una nuova prenotazione
  router.post(
    "/",
    checkSchema(prenotazioneSchema),
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
        idPrenotazione = await UserType.getUserType(user.userType).nuovaPrenotazione(
          req.user._id,
          req.body.descrizione,
          req.body.dateUtili
        );
        successRes(res, "OK", idPrenotazione, 201);
      } catch (error) {
        errorRes(res, error, error.message, error.code);
      }
    }
  );

  // Modifica una prenotazione
  router.put(
    "/:idPrenotazione",
    passport.authenticate("jwt", {
      session: false,
    }),
    async function (req, res, next) {
      const val = validationResult(req);
      if (!val.isEmpty()) {
        return errorRes(res, val, "Fields required", 424);
      }
      const user = await User.findOne({ _id: req.user._id });
  
      try {
        await UserType.getUserType(user.userType).modificaPrenotazione(
          req.params.idPrenotazione,
          req.body.nuovoStato,
          req.body.dataEffettiva
        );
  
        successRes(res, "OK");
      } catch (error) {
        errorRes(res, error, error.message, error.code);
      }
    }
  );

  module.exports = router;