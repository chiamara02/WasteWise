const UserHandler = require("../handlers/UserHandler");
const AnonymousUser = require("./AnonymousUser");

class LoggedUser extends AnonymousUser {
    constructor() {
        if (this.constructor === AbstractUser) {
            throw new TypeError(
                "Cannot be instantiated because it is an abstract class"
            );
        }
    }

    static async deleteAccount(idUser) {
        return await UserHandler.deleteAccount(idUSer);
    }

    static async changePassword(idUser, oldPassword, newPassword) {
        return await UserHandler.changePassword(idUser, oldPassword, newPassword);
    }
    
}

module.exports = LoggedUser;