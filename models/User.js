var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

var userSchema = new Schema({

    full_name: {
      type: String,
      required: [true, 'Le nom complet doit être fourni']
    },

    email: {

      type: String,

      Required: 'Adresse email ne peut pas être laissée en blanc.',
      validate: [validateEmail, 'Veuillez remplir une adresse email valide'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir une adresse email valide'],
      index: {
        unique: true,
        dropDups: true
      }
    },

    dob: {
      type: Date,
      required: [true, 'La date de naissance doit être fournie.']
    },

    job: {
      type: String,
      required: [true, 'Métier charm ne peut pas être laissé en blanc.']
    },

    gender: {
      type: String,
      required: [true, 'Le genre doit être fourni']
    },

    tel: {
      type: Number,
      required: [true, 'Votre numéro est obligatoire']
    },

    address: {
      type: String,
      required: [true, 'Votre address est obligatoire']
    },
    ques1: {
        type: String, required: [true, 'Veuillez reponds les question']
    },
    ques2: {
      type: String, required: [true, 'Veuillez reponds les question']
    },
     ques3: {
      type: String, required: [true, 'Veuillez reponds les question']
    },
     ques4: {
   type: String, required: [true, 'Veuillez reponds les question']
    },
  ques5: {
   type: String, required: [true, 'Veuillez reponds les question']
},


    // cv: {
    //   type: String
    // }
  } 
);

module.exports = mongoose.model('Users', userSchema);