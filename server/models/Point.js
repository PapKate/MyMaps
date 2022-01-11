const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point from a request
 */
class Point{

    constructor(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinatesId = coordinatesId;
        this.rating = rating;
        this.ratingNumber = ratingNumber;
        this.currentPopularity = currentPopularity;
        this.timespentId = timespentId;  
    }

     Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let query = `
            INSERT INTO points(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId, dateCreated, dateModified)
            VALUES("${this.id}", "${this.name}", "${this.address}", ${this.coordinatesId}, ${this.rating}, ${this.ratingNumber}, ${this.currentPopularity}, ${this.timespentId}, "${dateCreated}", "${dateModified}");
        `;

        return query;
    }

    static GetAll() {
        let query = `SELECT * FROM points`;

        return query;
    }

    static DeleteAll() {
        let query = `DELETE FROM points`;

        return query;
    }
    
    /*
    static GetAllOrderByRating() {
        let sql = `SELECT * FROM points ORDER BY rating;`;

        return db.execute(sql);
    }
    */

    static GetById(id) {
        let query = `SELECT * FROM points WHERE id = "${id}";`;

        return query;
    }

    /*
    static GetByCoordinatesId(coordinatesId) {
        let sql = `SELECT * FROM points WHERE id = ${coordinatesId};`;

        return db.execute(sql);
    } 
    */

    /**
     * Updates the username and the password
     * @param 
     * @param 
     * @param 
     * @returns 
     */
    static UpdateById(id, newName, newAddress, newCoordinatesId, newRating, newRatingNumber, newCurrentPopularity, newTimesSpentId) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let query = `UPDATE points SET name = "${newName}", 
                                    address = "${newAddress}", 
                                    coordinatesId = "${newCoordinatesId}",
                                    rating = "${newRating}",
                                    ratingNumber = "${newRatingNumber}",
                                    currentPopularity = "${newCurrentPopularity}",
                                    timespentId = "${newTimesSpentId}",
                                    dateModified = "${dateModified}"
                    WHERE id = "${id}";`;

        return query;
    }

    static DeleteById(id) {
        let query = `DELETE FROM points WHERE id = ${id};`;

        return query;
    }
}

module.exports = Point;