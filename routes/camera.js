const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
require("../models/connection");
const sitter = require("../models/sitters");
const { checkBody } = require("../modules/checkBody");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// TOKEN
const uid2 = require("uid2");
const Sitter = require("../models/sitters");

router.post("/upload", async (req, res) => {
  console.log("req.files", req.files);
  console.log("req.body", req.body);
  const path = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.photoFromFront.mv(path);
  console.log("resultMove", resultMove);
  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(path);
    console.log("retour de cloudinary", resultCloudinary);
    //ici on doit modifier l'utilisateur pour enregistrer l'url
    const updatedSitter = await Sitter.updateOne({ token: req.body.token });
    console.log("updatedSitter", updatedSitter);
    if (updatedSitter.modifiedCount == 1) {
      res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
      res.json({ result: false });
    }
  } else {
    res.json({ result: false, error: resultMove });
  }
  // file-system va supprimer le fichieer temporaire
  fs.unlinkSync(path);
});

module.exports = router;
