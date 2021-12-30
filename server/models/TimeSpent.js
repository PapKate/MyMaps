//const db = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents the timespent in the database
 */
class TimeSpent{

    constructor(minValue, maxValue) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    async Create() {
        let query = `
            INSERT INTO timespent(minValue, maxValue)
            VALUES('${this.minValue}', '${this.maxValue}');
        `;

        return query;
    }

    static GetAll() {
        let query = "SELECT * FROM timespent";

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM timespent WHERE id = ${id};`;

        return query;
    }

    /**
     * Updates the min and max value
     * @param {int} id 
     * @param {int} newMinValue 
     * @param {int} newMaxValue 
     * @returns 
     */

    static Update(id, newMinValue, newMaxValue) {

        let query = `UPDATE timespent SET minValue = ${newMinValue}, 
                                        maxValue = ${newMaxValue}
                                     WHERE id = ${id};`;

        return query;
    }
}

module.exports = TimeSpent;