const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point from a request
 */
class Point{

    constructor(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity = null, timespentId) {
        this.id = id;
        name = name.replace("\'","\\'")
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
            VALUES("${this.id}",  '${this.name}', "${this.address}", ${this.coordinatesId}, ${this.rating}, ${this.ratingNumber}, ${this.currentPopularity}, ${this.timespentId}, "${dateCreated}", "${dateModified}");
        `;

        return query;
    }

    static GetAll() {
        let query = `SELECT points.id, points.name, points.address, points.address, points.currentPopularity, points.rating, points.ratingNumber, 
                            coordinates.lat, coordinates.lng,
                            timespent.maxValue, timespent.minValue,
                            populartimes.name as "day", populartimes.hour00, populartimes.hour01, populartimes.hour02, populartimes.hour03, populartimes.hour04, populartimes.hour05, populartimes.hour06, populartimes.hour07, 
                            populartimes.hour08, populartimes.hour09, populartimes.hour10, populartimes.hour11, populartimes.hour12, populartimes.hour13, populartimes.hour14, populartimes.hour15, populartimes.hour16, 
                            populartimes.hour17, populartimes.hour18, populartimes.hour19, populartimes.hour20, populartimes.hour21, populartimes.hour22, populartimes.hour23
                        FROM points LEFT JOIN coordinates on points.coordinatesId = coordinates.id
                        LEFT JOIN timespent on points.timespentId = timespent.id 
                        RIGHT JOIN populartimes on points.id = populartimes.pointId;`;

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

    static DeleteById(id) {
        let query = `DELETE FROM points WHERE id = ${id};`;

        return query;
    }
}

module.exports = Point;