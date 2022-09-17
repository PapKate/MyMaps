const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 ** Represents the timespent in the database
 */
class TimeSpent {

    /**
     ** Default constructor 
     * @param {int} minValue The minimum value
     * @param {int} maxValue The maximum value
     */
    constructor(minValue, maxValue) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    /**
     ** Creates a time spent
     */
    Create() {
        let query = `INSERT INTO timespent(minValue, timespent.maxValue) VALUES(${this.minValue}, ${this.maxValue});`;

        return query;
    }

    /**
     ** Creates multiple time spent pairs 
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO timespent(minValue, timespent.maxValue) VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the time spent pairs 
     */
    static GetAll() {
        let query = "SELECT * FROM timespent";

        return query;
    }

    /**
     ** Gets a time spent that has the given id 
     * @param {int} id The id
     */
    static GetById(id) {
        let query = `SELECT * FROM timespent WHERE id = ${id};`;

        return query;
    }

    /**
     ** Updates the min and max value
     * @param {int} id 
     * @param {int} newMinValue 
     * @param {int} newMaxValue 
     * @returns 
     */

    static Update(id, newMinValue, newMaxValue) {

        let query = `UPDATE timespent SET minValue = ${newMinValue}, 
                                          timespent.maxValue = ${newMaxValue}
                                      WHERE id = ${id};`;

        return query;
    }

    /**
     ** Deletes the timespent
     * @param {int} id 
     */
         static DeleteById(id) {

            let query = `DELETE FROM timespent WHERE id = ${id};`;
   
           return query;
       }
}

module.exports = TimeSpent;