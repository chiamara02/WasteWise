const AbstractUser = require('../users/AbstractUser');
const AnonymousUser = require('../users/AnonymousUser');
const Cittadino = require('../users/Cittadino');
const Ente = require('../users/Ente');
const Operatore = require('../users/Operatore');

const userTypes = {
    'abstractUser': AbstractUser,
    'anonymousUser': AnonymousUser,
    'cittadino': Cittadino,
    'ente': Ente,
    'operatore': Operatore
};

class UserType {
    constructor() {
        if (this.constructor === UserType) {
            throw new TypeError('UserType cannot be instantiated because it is an abstract class');
        }
    }

    static getUserType(userType) {
        return userTypes[userType];
    }
}

module.exports = UserType;