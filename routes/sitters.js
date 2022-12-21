var express = require("express");
var router = express.Router();

require("../models/connection");
const Sitter = require("../models/sitters");
const { checkBody } = require("../modules/checkBody");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");

//Route d'inscription d'un plant-sitter
router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["lastname", "firstname", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  // vérifier si l'utilisateur n'a pas déjà été enregistré
  Sitter.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newSitter = new Sitter({
        company: "myCompanyName",
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        phonenumber: req.body.phonenumber,
        gender: "Mr",
        userbio:
          "Depuis 2011 je suis passioné de plantes exotiques et surtout la combination avec des fleurs et plantes vivaces.",
        userphoto: "",
        useraddress: {
          cityname: "Marseille",
          zipcode: 13001,
          latitude: 45.751036,
          longitude: 4.840246,
        },
        active: true,
        equipement: "semi-amateur",
        skills: {
          arrosage: 95,
          entretien: 80,
          traitement: 60,
          autres: 30,
        },
        tarifs: {
          tarif1: 8,
          tarif2: 14,
          tarif3: 18,
        },
        reviews: {
          author: "639708e76f11e2a75361c714",
          reviewnote: 10,
          reviewtext: "Top",
        },
        rib: "mon rib",
        status: "Plant-Sitter Amateur",
      });

      newSitter.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      //L'utilisateur existe déjà dans la base de données
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//route de connexion
router.post("/signin", (req, res) => {
  console.log(req.body);
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  Sitter.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((data) => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
        token: data.token,
        email: data.email,
      });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

//Route d'affichage de tous les sitters

router.get("/allSitters", (req, res) => {
  Sitter.find().then((data) => {
    if (data) {
      console.log("data", data);
    } else {
      res.json({
        result: false,
        error: "Il y a aucun Plant-Sitter dans la BDD",
      });
    }
  });
});

// Route d'affichage listing sitters en fonction des param de choix.

router.post("/listsitters", async (req, res) => {
  const options = {};

  if (req.body.arrosage === true) {
    options["skills.arrosage"] = {
      $gte: 50,
    };
  }
  if (req.body.entretien === true) {
    options["skills.entretien"] = {
      $gte: 50,
    };
  }
  if (req.body.traitement === true) {
    options["skills.traitement"] = {
      $gte: 50,
    };
  }
  if (req.body.autres === true) {
    options["skills.autre"] = {
      $gte: 50,
    };
  }
  // L’opérateur $match sert pour filtrer les documents d’une collection.

  const matchingSitters = await Sitter.aggregate([
    {
      $match: options,
    },
  ]);

<<<<<<< HEAD
  // Calcule de la note moyenne des commentaires
  const sittersNote = await Sitter.aggregate([
    { $match: { active: true } },

    //tableau de sous-documents avec $unwind

    { $unwind: "$reviews" },
    {
      //utilisons $group pour calculer la moyenne des notes
      $group: {
        _id: "$_id",
        // opérateur $avg pour calculer la moyenne
        average: { $avg: "$reviews.reviewNote" },
      },
    },
  ]);

  // fonction pour merge les 2 tableaux d'objects via l'ID.
  function mergeArrayObjects(arr1, arr2) {
    return arr1.map((item, i) => {
      if (item.id === arr2[i].id) {
        //merging two objects
        return Object.assign({}, item, arr2[i]);
      }
    });
  }

  const sittersWithAverage = mergeArrayObjects(matchingSitters, sittersNote);

  console.log(JSON.stringify(mergeArrayObjects(matchingSitters, sittersNote)));
  res.json({ result: true, sittersWithAverage });

  // console.log("Voici les résultats", matchingSitters, sittersNote);
=======
  res.json({ result: true, matchingSitters });

  console.log("Voici les résultats", matchingSitters);
});

// Route affichage moyenne note

router.get("/average", (req, res) => {
  Sitter.aggregate(
    [
      { $match: { lastname: req.body.lastname } },
      { $unwind: "$reviews" },
      {
        $group: {
          _id: null,
          avg_val: { $avg: "$reviews.reviewnote" },
        },
      },
    ],
    (err, result) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.json(result);
      }
    }
  );
>>>>>>> planti
});

module.exports = router;
