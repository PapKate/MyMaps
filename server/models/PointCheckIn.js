const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 ** Represents a point check in from a request
 */
class PointCheckIn{

    /**
     ** Default constructor
     * @param {int} userId 
     * @param {string} pointId 
     * @param {int} customers 
     * @param {Date} checkInDate 
     */
    constructor(userId, pointId, customers, checkInDate) {
        this.userId = userId;
        this.pointId = pointId;
        this.customers = customers;
        this.checkInDate = checkInDate;
    }

    /**
     ** Creates a point check in 
     */
    Create() {
        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let query = `
            INSERT INTO pointcheckin(userId, pointId, customers, checkInDate)
            VALUES (${this.userId}, "${this.pointId}", ${this.customers}, "${dateTimeNow}");
        `;

        return query;
    }

    /**
     **  Creates multiple values
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO pointcheckin(userId, pointId, customers, checkInDate)
        VALUES ${valuesString};`;

        return query;
    }
    /**
     ** Gets all the point check ins from the data base
     */
    static GetAll(queryParams = null, orderBy = null) {
        let query = `SELECT id, userId, pointId, customers, checkInDate FROM pointcheckin`;
        query = ControllerHelpers.FormatQueryFromParams(query, queryParams, orderBy);

        return query;
    }

    /**
     ** Get all point check ins and their types 
     */
    static GetAllPointCheckInsTypes() {
        let query = `SELECT types.name, points.id FROM pointcheckin 
                        LEFT JOIN (points 
                        LEFT JOIN pointandtypes ON points.id = pointandtypes.pointId
                        LEFT JOIN types ON types.id = pointandtypes.typeId) 
                        ON pointcheckin.pointId = points.id
                        ORDER BY types.name;`
        
        return query;
    }

    /**
     ** Get all the point check ins and the confirmed cases 
     * @returns 
     */
    static GetAllPointCheckInCases(queryParams = null, orderBy = null) {
        let query = `SELECT * FROM pointcheckin 
		INNER JOIN confirmedcases ON pointcheckin.userId = confirmedcases.userId
        WHERE pointcheckin.checkInDate >= DATE_SUB(confirmedcases.date, INTERVAL 7 DAY) AND
        pointcheckin.checkInDate <= DATE_ADD(confirmedcases.date, INTERVAL 14 DAY)`;
        
        query = ControllerHelpers.FormatQueryFromParams(query, queryParams, orderBy);

        return query;
    }

    /**
     ** Gets all the point check in and points
     */
    static GetAllWithPoints(queryParams = null)
    {
        let query = `SELECT pointcheckin.id, userId,pointId, customers, checkInDate, points.name FROM pointcheckin 
                        LEFT JOIN points ON pointcheckin.pointId = points.id `;

        query = ControllerHelpers.FormatQueryFromParams(query, queryParams);
        return query;
    }
    /**
     ** Gets all the point check ins and points from the data base
     */
     static GetAllPointsCheckInsPoints() {
        let query = `SELECT pointcheckin.id, userId, pointId, checkInDate, name FROM pointcheckin LEFT JOIN points ON pointcheckin.pointId = points.id;`;
        return query;
    }
    

    /**
     ** Deletes all the point check ins from the data base
     */
    static DeleteAll() {
        let query = `DELETE FROM pointcheckin`;

        return query;
    }

    /**
     ** Gets the point check ins for the point with id the specified @pointId from the data base
     * @param {string} pointId The point's id
     */
    static GetByPointId(pointId) {
        let query = `SELECT * FROM pointcheckin WHERE pointId = ${pointId};`;
        return query;
    }
}

module.exports = PointCheckIn;
