const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");
const passport = require("passport");
const User = require("../db/user").User;
const TipoUtente = require("../utils/UserType");

const { checkSchema, validationResult, check } = require("express-validator");
const questionarioSchema = require("../validation/index").questionarioSchema;

// Sondaggi
//cittadino
router.get(
  "/sondaggio",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      idSondaggio = await TipoUtente.getUserType(user.userType).mostraSondaggi(
        req.body.titolo,
        req.body.domande
      );
      successRes(res, "OK", idSondaggio, 201);
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

//ente
router.post(
  "/sondaggio",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      data = await TipoUtente.getUserType(user.userType).nuovoSondaggio(
        req.body.titolo,
        req.body.domande
      );
      successRes(res, "OK", data, 200);
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

// Questionari
//ente
router.get(
  "/questionario",
  passport.authenticate("jwt", {
    session: false,
  }),
  async function (req, res, next) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      data = await TipoUtente.getUserType(user.userType).mostraQuestionariCompilati(
        req.query.userId,
        req.query.sondaggioId
      );
      successRes(res, "OK", data, 200);
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

//cittadino
router.post(
  "/questionario",
  checkSchema(questionarioSchema),
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
      questionario = await TipoUtente.getUserType(
        user.userType
      ).compilaQuestionario(
        req.body.sondaggio,
        req.user._id,
        req.body.risposte
      );
      successRes(res, "OK", questionario, 201);
    } catch (error) {
      errorRes(res, error, error.message, error.code);
    }
  }
);

module.exports = router;
