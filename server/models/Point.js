const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point from a request
 */
class Point{

    /**
     ** Default constructor 
     * @param {string} id 
     * @param {string} name 
     * @param {string} address 
     * @param {int} coordinatesId 
     * @param {double} rating 
     * @param {int} ratingNumber 
     * @param {int} currentPopularity 
     * @param {int} timespentId 
     */
    constructor(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity = null, timespentId) {
        this.id = id;
        name = name.replaceAll("\'","\\'");
        name = name.replaceAll('\"',"\\'");
        this.name = name;
        this.address = address;
        this.coordinatesId = coordinatesId;
        this.rating = rating;
        this.ratingNumber = ratingNumber;
        this.currentPopularity = currentPopularity;
        this.timespentId = timespentId;  
    }

    /**
     ** Creates a point
     */
    Create() {
        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;
        let query = `
            INSERT INTO points(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId, dateCreated, dateModified)
            VALUES("${this.id}",  '${this.name}', "${this.address}", ${this.coordinatesId}, ${this.rating}, ${this.ratingNumber}, ${this.currentPopularity}, ${this.timespentId}, "${dateCreated}", "${dateModified}");
        `;

        return query;
    }

    /**
     ** Creates multiple points
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO points(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId, dateCreated, dateModified)
                        VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the points
     */
    static GetAll() {
        let query = `SELECT * FROM points ;`;

        return query;
    }

    /**
     ** Gets all the points and their types
     */
    static GetPointTypes() {
        let query = `SELECT points.id, points.name, points.address, points.address, points.currentPopularity, points.rating, points.ratingNumber, 
        GROUP_CONCAT(DISTINCT types.name SEPARATOR ', ') as "categories"
        FROM points INNER JOIN pointandtypes ON points.id = pointandtypes.pointId 
        INNER JOIN types ON pointandtypes.typeId = types.id GROUP BY points.id;`

        return query;
    }
    
    /**
     ** Deletes all the points
     */
    static DeleteAll() {
        let query = `DELETE FROM points`;

        return query;
    }

    /**
     * Gets the point with the given id
     * @param {string} id The id
     */
    static GetById(id) {
        let query = `SELECT * FROM points WHERE id = "${id}";`;

        return query;
    }

    /**
     ** Updates the username and the password
     */
    static UpdateById(id, newName, newAddress, newCoordinatesId, newRating, newRatingNumber, newCurrentPopularity, newTimesSpentId) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let query = `UPDATE points SET name = '${newName}', 
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

    /**
     ** Deletes the point with the given id
     * @param {string} id The id
     */
    static DeleteById(id) {
        let query = `DELETE FROM points WHERE id = "${id}";`;

        return query;
    }
}

module.exports = Point;