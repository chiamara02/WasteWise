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
  zona:{
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

const userTypeSchema = {
  userType: {
    optional: true,
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
  // utente :{
  //   notEmpty: true,
  //   isString: true,
  //   required: true
  // },
  descrizione:{
    notEmpty: true,
    isString: true,
    required : true,
  },
  indirizzo: {
    notEmpty: true,
    isString: true,
    required : true,
  },
  foto:{
    notEmpty: true,
    isString: true,
    required : true,
  }
};


module.exports = {
  userSchemaSignUP,
  userSchemaLogin,
  passwordSchema,
  emailSchema,
  nomeSchema,
  zonaSchema,
  userTypeSchema,
  changePasswordSchema,
  segnalazioneSchema
};

