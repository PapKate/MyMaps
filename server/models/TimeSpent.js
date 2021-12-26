const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');


class TimeSpent{

    constructor(id, minValue, maxValue, dateCreated, dateModified) {
        this.id = id;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }

    async Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let sql = `
            INSERT INTO timespent(minValue, maxValue, dateCreated, dateModified)
            VALUES('${this.minValue}', '${this.maxValue}', '${dateCreated}', '${dateModified}');
        `;

        return db.execute(sql);
    }

    static GetAll() {
        let sql = "SELECT * FROM timespent";

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM timespent WHERE id = ${id};`;

        return db.execute(sql);
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @param {int} newMinValue 
     * @param {int} newMaxValue 
     * @returns 
     */

    static Update(id, newMinValue, newMaxValue) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let sql = `UPDATE timespent SET minValue = ${newMinValue}, 
                                        maxValue = ${newMaxValue}, 
                                        dateModified = ${dateModified} 
                                     WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = TimeSpent;