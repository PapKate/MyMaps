const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents the user from a request
 */
class User{

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let query = `
            INSERT INTO users(username, email, password, dateCreated, dateModified)
            VALUES('${this.username}', '${this.email}', '${this.password}', '${dateCreated}', '${dateModified}');
        `;

        return query;
    }

    static GetAll() {
        let query = `SELECT * FROM users`;

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM users WHERE id = ${id};`;

        return query;
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @param {string} newUsername 
     * @param {string} newPassword 
     * @returns the sql query
     */
    static UpdateById(id, newUsername, newPassword) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let query = `UPDATE users SET username = ${newUsername}, 
                                      password = ${newPassword}, 
                                      dateModified = ${dateModified} 
                    WHERE id = ${id};`;

        return query;
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @returns 
     * 
     */
     static DeleteById(id) {

         let query = `DELETE FROM users WHERE id = ${id};`;

        return query;
    }
}

module.exports = User;