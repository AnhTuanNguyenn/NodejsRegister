var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Users');
const pdf = require('pdf-parse');

const { google } = require('googleapis');
const fs = require('fs');
const config = require('../config');
// var crypto    = require('crypto'), hmac, signature;
const {
  check,
  validationResult
} = require('express-validator/check');
const {
  matchedData,
  sanitize
} = require('express-validator/filter');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Coaching Globedreamers'
  });
})

/* POST user registration page. */
router.post('/register', [

  check('full_name', 'Nom et Prénom ne pas vider')
  .isLength({
    min: 1
  }),

  check('email')
  .isEmail().withMessage('Veuillez saisir un valid email addresse')
  .trim()
  .normalizeEmail()
  .custom(value => {
    return findUserByEmail(value).then(User => {
      //if user email already exists throw an error
    })
  }),

  check('address')
  .isLength({
    min: 5
  }).withMessage('Address est obligatoire')
  .matches(/\d/).withMessage('Address complet doit contenir un numéro'),
  // .custom((value,{req, loc, path}) => {
  //   if (value !== req.body.cpassword) {
  //       throw error if passwords do not match
  //       throw new Error("Les mots de passe ne correspondent pas");
  //   } else {
  //       return value;
  //   }
  //    }),

  check('gender', 'Veuillez sélectionner le sexe')
  .isLength({
    min: 1
  }),

  check('dob', 'La date de naissance ne peut pas être laissée en blanc')
  .isLength({
    min: 1
  }),

  check('job', 'Métier charm ne peut pas être laissé en blanc')
  .isLength({
    min: 1
  }),

  check('ques1', 'Veuillez répondre les question').isLength({min:2}),
  check('ques2', 'Veuillez répondre les question').isLength({min:2}),
  check('ques3', 'Veuillez répondre les question').isLength({min:2}),

  check('terms', 'Veuillez accepter nos termes et conditions').equals('yes'),

], async function (req, res, next) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    res.json({
      status: "error",
      message: errors.array()
    });

  }
var convertCV = await main(req.body.cv);
console.log(convertCV);
  var document = {
    full_name: req.body.full_name,
    email: req.body.email,
    address: req.body.address,
    dob: req.body.dob,
    job: req.body.job,
    gender: req.body.gender,
    tel: req.body.tel,
    ques1: req.body.ques1,
    ques2: req.body.ques2,
    ques3: req.body.ques3,
    cv: convertCV
   
  };

  var user = new User(document);
  user.save(function (error) {
    console.log(user);
    if (error) {
      throw error;
    }
    res.json({
      message: "Données sauvegardées succès.",
      status: "success"
    })
    // res.render('./success.js', {title:Success});
  });
});

function findUserByEmail(email) {

  if (email) {
    return new Promise((resolve, reject) => {
      User.findOne({
          email: email
        })
        .exec((err, doc) => {
          if (err) return reject(err)
          if (doc) return reject(new Error('Ce courriel existe déjà. Veuillez saisir un autre email.'))
          else return resolve(email)
        })
    })
  }
}



var oauth2Client = new google.auth.OAuth2(config.YOUR_CLIENT_ID, config.YOUR_CLIENT_SECRET, config.YOUR_REDIRECT_URL);
oauth2Client.credentials = {
    refresh_token: config.REFRESH_TOKEN
};

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});
async function main(cv) {
    const res = await drive.files.create({
        requestBody: {
            name: cv,
            mimeType: 'application/pdf'
        },
        media: {
            mimeType: 'application/pdf',
            body: fs.createReadStream(cv)
        }
    })
    console.log(res.data.id);
    return res.data.id;
};




module.exports = router;