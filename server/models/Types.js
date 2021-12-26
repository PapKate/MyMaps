const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');


class Types{

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let sql = `
            INSERT INTO types(name, dateCreated, dateModified)
            VALUES('${this.name}', '${dateCreated}', '${dateModified}');
        `;

        return db.execute(sql);
    }

    static GetAll() {
        let sql = "SELECT * FROM types";

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM types WHERE id = ${id};`;

        return db.execute(sql);
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @param {string} newName
     * @returns 
     */
    static Update(id, newName) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let sql = `UPDATE types SET name = ${newName},
                                    dateModified = ${dateModified} 
                    WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = Types;