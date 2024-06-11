const tappa = require("../db/tappa");

const emailSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Email is not valid",
  },
};

const passwordSchema = {
  password: {
    errorMessage:
      "The password must be at least 8 characters, and must contain a symbol",
    isLength: { options: { min: 8 } },
    matches: { options: /[!@#$%^&*]/ },
  },
};

const nomeSchema = {
  nome: {
    notEmpty: true,
    errorMessage: "name is not valid",
    isLength: { options: { max: 50 } },
  },
};

const zonaSchema = {
  zona: {
    notEmpty: true,
    errorMessage: "zone is not valid",
    isIn: {
      options: [
        [
          "Povo",
          "Villazzano",
          "Cognola",
          "Ravina",
          "Romagnano",
          "Argentario",
          "Bondone",
          "Sardagna",
          "Mattarello",
          "S.Giuseppe",
          "S.Chiara",
          "Cristo Re",
          "San Martino",
          "Piedicastello",
          "Solteri",
          "Vela",
          "Campotrentino",
          "Via Kofler",
          "Casteller",
          "Gardolo",
          "Gardolo Zona Industriale",
          "Meano",
          "Oltrefersina",
          "Piazza Lodron",
          "Piazza Pasi",
          "Via Oriola",
          "Via del Simonino",
          "Piazza C.Battisti",
          "Via Malpaga",
          "Via Diaz",
          "Via Oss Mazzurana",
          "Piazza Duomo (Lato Est)",
          "Piazza Duomo (Lato Ovest)",
          "Via delle Orne",
          "Via Torre Verde",
          "Vicolo dell'Adige",
          "Vicolo del Vo'",
          "Piazza della Mostra",
          "Via del Suffragio",
          "Via Marchetti",
          "Via Ferruccio",
          "Via Santa Maria Maddalena",
          "Via Galilei",
          "Via della Roggia Grande",
          "Piazza delle Erbe",
          "Piazza Vittoria",
          "Via Dordi",
          "Via Calepina",
          "Via Mantova",
          "Via SS.Trinita'",
          "Piazza Garzetti",
          "I Androna Borgonuovo",
          "II Androna Borgonuovo",
          "Via Dietro le Mura A",
          "Via Garibaldi",
          "Via San Vigilio",
          "Via Mazzini",
          "Largo Carducci",
          "Via degli Orbi",
          "Via San Pietro",
          "Via San Marco",
          "Via Manci",
          "Via Pozzo",
          "Via Orfane",
          "Via Cavour",
          "Via Roma",
          "Via Esterle",
          "Via Verdi",
          "Via Maffei",
          "Via Don Rizzi",
          "Via San Giovanni",
          "Via R.Belenzani",
          "Piazza Verzeri",
          "Vicolo Orsoline",
          "Piazza Santa Maria Maggiore"
        ],
      ],
    },
  }
}

const tappaSchema = {
  tappa: {
    notEmpty: true,
    errorMessage: "zone is not valid",
    isString : true
  },
};

const percorsoSchema = {
  zonaAssociata: {
    notEmpty: true,
    isString: true,
  },
  tappe: {
    notEmpty: true,
    isString: true,
  }
}

const userTypeSchema = {
  userType: {
    isIn: {
      options: [
        [
          "abstractUser",
          "anonymousUser",
          "cittadino",
          "ente",
          "operatore",
        ],
      ],
    },
  },
};

const userSchemaSignUP = {
  email: emailSchema.email,
  password: passwordSchema.password,
  nome: nomeSchema.nome,
  zona: zonaSchema.zona,
  userType: userTypeSchema.userType,
};

const userSchemaLogin = {
  email: emailSchema.email,
  password: passwordSchema.password,
};

const changePasswordSchema = {
  oldPassword: passwordSchema.password,
  newPassword: passwordSchema.password,
};

const segnalazioneSchema = {
  descrizione: {
    notEmpty: true,
    isString: true,
  },
  indirizzo: {
    notEmpty: true,
    isString: true,
  },
  foto: {
    notEmpty: true,
    isString: true,
  },
};

const prenotazioneSchema = {
  descrizione:{
    notEmpty: true,
    isString: true,
  },
  dateUtili:[{
    notEmpty: true,
    isDate: true,
  }],
  stato: {
    optional: true,
    isIn: {
      options: [
        [
          "inAttesa",
          "confermata",
          "rifiutata",
          "completata"
        ],
      ],
    },
  },
  dataEffettiva:{
    isDate: true,
    optional: true,
  },
};

const taxSchema = {
  stato: {
    optional: true,
    isIn: {
      options: [
        [
          "pagato",
          "nonPagato",
          undefined
        ],
      ],
    },
  }
};

const questionarioSchema = {
  sondaggio: {
    in: ['body'],
    errorMessage: 'Sondaggio ID is required',
    isMongoId: true,
    notEmpty: true,
  },
  risposte: {
    in: ['body'],
    errorMessage: 'Risposte are required',
    isArray: true,
    notEmpty: true,
    custom: {
      options: (value) => {
        // Ensure all answers are non-empty strings
        return value.every((answer) => typeof answer === 'string' && answer.trim() !== '');
      },
      errorMessage: 'Each response must be a non-empty string',
    },
  },
};

module.exports = {
  userSchemaSignUP,
  userSchemaLogin,
  passwordSchema,
  emailSchema,
  nomeSchema,
  zonaSchema,
  tappaSchema,
  userTypeSchema,
  changePasswordSchema,
  segnalazioneSchema,
  taxSchema,
  questionarioSchema,
  prenotazioneSchema,
};

