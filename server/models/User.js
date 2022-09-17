const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents the user from a request
 */
class User{

    /**
     ** Default constructor 
     * @param {string} username The username
     * @param {string} email The email
     * @param {string} password The password
     */
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    /**
     ** Creates a user 
     */
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

    /**
     ** Creates multiple users 
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO users(username, email, password, dateCreated, dateModified) VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the users 
     */
    static GetAll() {
        let query = `SELECT * FROM users`;

        return query;
    }

    /**
     ** Gets the user with the specified id 
     * @param {int} id The id
     */
    static GetById(id) {
        let query = `SELECT * FROM users WHERE id = ${id};`;

        return query;
    }

    /**
     ** Updates the username and the password
     * @param {int} id 
     * @param {string} newUsername 
     * @param {string} newPassword 
     * @returns the sql query
     */
    static UpdateById(id, newUsername, newPassword) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        if(ControllerHelpers.IsNullOrEmpty(newUsername) && ControllerHelpers.IsNullOrEmpty(newPassword)) {   
            let query = `SELECT* FROM users  
            WHERE id = ${id};`;
            return query;
        } else if(ControllerHelpers.IsNullOrEmpty(newPassword)) {
            let query = `UPDATE users SET 
            username = "${newUsername}", 
            dateModified = "${dateModified}" 
            WHERE id = ${id};`;
            return query;
        } else if(ControllerHelpers.IsNullOrEmpty(newUsername))
        {
            let query = `UPDATE users SET 
            password = "${newPassword}", 
            dateModified = "${dateModified}" 
            WHERE id = ${id};`;
            return query;
        }
        else {
            let query = `UPDATE users SET 
            username = "${newUsername}", 
            password = "${newPassword}", 
            dateModified = "${dateModified}" 
            WHERE id = ${id};`;
            return query;
        };
        
    }

    /**
     ** Deletes the username and the password
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