const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents the admin in the database
 */

class Admin{

    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    async Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let sql = `
            INSERT INTO admins(username, password)
            VALUES('${this.username}', '${this.password}');
        `;

        return db.execute(sql);
    }

    static GetAll() {
        let sql = "SELECT * FROM admins";

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM admins WHERE id = ${id};`;

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

        let sql = `UPDATE admins SET username = ${newUsername}, 
                                    password = ${newPassword}, 
                                    dateModified = ${dateModified} 
                    WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = Admin;