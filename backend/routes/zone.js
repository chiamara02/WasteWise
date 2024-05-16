const express = require("express");
const router = express.Router();
const Zona = require("../db/zona").Zona
const { errorRes, successRes } = require("../response");

router.get(
    "/",
    async function (req, res, next) {
        try {
            let zone = await Zona.find().sort({nome: 1})
            zone = zone.map((item)=>{
                return item.nome;
            })
            successRes(res, "Success", zone, 200);
        } catch(error) {
            errorRes(res, error, error.message, error.code);
        }
    }
);

module.exports = router;