const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../response");

const User = require("../db/user").User;
const { Percorso } = require('../db/percorso');
const NotFoundException = require("../exceptions/NotFoundException");
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const UnauthorizedException = require("../exceptions/UnauthorizedException");

const passport = require("passport");
const { checkSchema, validationResult } = require("express-validator");

const UserType = require("../utils/UserType");
const { updateTappaAttuale, getFeedAttuale, getPercorso, getPercorsi } = require("../handlers/TrackingHandler");
const zona = require("../db/zona");
const Zona = require("../db/zona").Zona;

// getPercorso("5f2e3d8a8b9c6e0017e6d1f1")
// updateTappaAttuale("5f2e3d8a8b9c6e0017e6d1a9", "5f2e3d8a8b9c6e0017e6d1a4", "5f2e3d8a8b9c6e0017e6d469")
// getFeedAttuale("5f2e3d8a8b9c6e0017e6d1a9")

// router.get(
//     // "/",
//     // passport.authenticate("jwt", {
//     //   session: false,
//     // }),
//     async function (req, res, next){
//         // const val = validationResult(req);
//         // if (!val.isEmpty()) {
//         //     return errorRes(res, null, "Bad parameters", 424);
//         // }
//         const user = await User.findOne({_id: req.user._id});
//         updateTappaAttuale("5f2e3d8a8b9c6e0017e6d1a9", user._id)
//         try{
//             // const stato = req.query.stato;
//             // data = await TipoUtente.getUserType(user.userType).getTasse(req.user._id, stato);
//             // console.log(data)        
//             successRes(res, "OK", "data", 200);
//         } catch (error){
//             errorRes(res, error, error.message, error.code);
//         }
// });

// module.exports = router;

//Get tutti i percorsi
router.get(
    '/percorsi',
    // passport.authenticate("jwt", {
    //     session: false,
    // }),
    async function (req, res, next) {
        try {
            data = await getPercorsi();
            successRes(res, "OK", data, 200);
        } catch (error) {
            errorRes(res, error, error.message, error.code);
        }
    });

// Check 
router.get(
    '/',
    passport.authenticate("jwt", {
        session: false,
    }),
    async function (req, res, next) {
        const val = validationResult(req);
        if (!val.isEmpty()) {
            return errorRes(res, null, "Bad parameters", 424);
        }
        let zonaId = req.query.zona;
        const user = await User.findOne({ _id: req.user._id });

        try {
            let data = await UserType.getUserType(user.userType).getFeedAttuale(zonaId);
            if(user.userType === "cittadino") {
                delete data.operator;
            }
            successRes(res, "OK", data, 200);

        } catch (error) {
            errorRes(res, error, error.message, error.code);
        }
    });

// Update to next stop
router.post(
    '/',
    passport.authenticate("jwt", {
        session: false,
    }),
    async function (req, res, next) {
        const val = validationResult(req);
        if (!val.isEmpty()) {
            return errorRes(res, null, "Bad parameters", 424);
        }
        try {
            const zona = req.body.zona
            const user = await User.findOne({ _id: req.user._id });
            let feed = await UserType.getUserType(user.userType).getFeedAttuale(zona);
            console.log(feed)
            
            if (feed.operator && feed.operator._id.toString() !== req.user._id.toString()) throw new UnauthorizedException("Operazione non consentita")
            if (!feed.nextStop) throw new FailedDependencyException("Corsa già terminata")
            
            let update = await UserType.getUserType(user.userType).updateTappaAttuale(
                zona,
                feed.nextStop._id,
                req.user._id
            );
            feed = await UserType.getUserType(user.userType).getFeedAttuale(zona);

            successRes(res, "OK", feed, 200);
        } catch (error) {
            errorRes(res, error, error.message, error.code);
        }
    });

module.exports = router;