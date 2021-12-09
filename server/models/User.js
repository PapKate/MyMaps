const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a user in the database
 */
class User{

    constructor(id, username, email, password, dateCreated, dateModified) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let sql = `
            INSERT INTO users(username, email, password, dateCreated, dateModified)
            VALUES('${this.username}', '${this.email}', '${this.password}', '${dateCreated}', '${dateModified}');
        `;

        return db.execute(sql);
    }

    static GetAll() {
        let sql = "SELECT * FROM users";

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM users WHERE id = ${id};`;

        return db.execute(sql);
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @param {string} newUsername 
     * @param {string} newPassword 
     * @returns 
     */
    static Update(id, newUsername, newPassword) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let sql = `UPDATE users SET username = ${newUsername}, 
                                    password = ${newPassword}, 
                                    dateModified = ${dateModified} 
                    WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = User;