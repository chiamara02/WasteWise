const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({    
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    zona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zona',                  
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: [
            "abstractUser",
            "anonymousUser",
            "cittadino",
            "ente",
            "operatore"
        ],
    },
});

// Hashing password before saving it to the database
UserSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

// Function for hashing password
UserSchema.methods.hashPassword = async function (password) { return await bcrypt.hash(password, 10); };

// Validating password
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

var User = mongoose.model("User", UserSchema);

module.exports = {
    User: User,
};