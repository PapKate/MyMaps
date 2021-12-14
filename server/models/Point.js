const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point in the database
 */
class Point{

    constructor(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId, dateCreated, dateModified) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinatesId = coordinatesId;
        this.rating = rating;
        this.ratingNumber = ratingNumber;
        this.currentPopularity = currentPopularity;
        this.timespentId = timespentId;  
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }

    constructor(name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId) {
        this.name = name;
        this.address = address;
        this.coordinatesId = coordinatesId;
        this.rating = rating;
        this.ratingNumber = ratingNumber;
        this.currentPopularity = currentPopularity;
        this.timespentId = timespentId;  
    }

    async Create() {

        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let dateCreated = dateTimeNow;
        let dateModified = dateTimeNow;

        let sql = `
            INSERT INTO points(name, address, coordinatesId, rating, ratingNumber, currentPopularity, timespentId)
            VALUES('${this.name}', '${this.address}', '${this.coordinatesId}', '${this.rating}', '${this.ratingNumber}', '${this.currentPopularity}','${dateCreated}', '${dateModified}');
        `;

        return db.execute(sql);
    }

    static GetAll() {
        let sql = `SELECT * FROM points`;

        return db.execute(sql);
    }

    static GetAllOrderByRating() {
        let sql = `SELECT * FROM points ORDER BY rating;`;

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM points WHERE id = ${id};`;

        return db.execute(sql);
    }

    static GetByCoordinatesId(coordinatesId) {
        let sql = `SELECT * FROM points WHERE id = ${coordinatesId};`;

        return db.execute(sql);
    }

    

    /**
     * Updates the username and the password
     * @param 
     * @param 
     * @param 
     * @returns 
     */
    static Update(id, newName, newAddress, newCoordinatesId, newCurrentPopularity, newTimesSpentId) {

        // Gets the current date time as string
        var dateModified = ControllerHelpers.GetCurrentDateTime();

        let sql = `UPDATE users SET name = ${newName}, 
                                    address = ${newAddress}, 
                                    coordinatesId = ${newCoordinatesId}
                                    currentPopularity = ${newCurrentPopularity}
                                    timespentId = ${newTimesSpentId}
                                    dateModified = ${dateModified} 
                    WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = Point;