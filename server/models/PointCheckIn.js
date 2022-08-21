const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point check in from a request
 */
class PointCheckIn{

    constructor(id, userId, pointId, customers, checkInDate) {
        this.id = id;
        this.userId = userId;
        this.pointId = pointId;
        this.customers = customers;
        this.checkInDate = checkInDate;
    }

    Create() {
        let dateTimeNow = ControllerHelpers.GetCurrentDateTime();

        let query = `
            INSERT INTO pointcheckin(userId, pointId, customers, checkInDate)
            VALUES (${this.userId}, "${this.pointId}", ${this.customers}, "${dateTimeNow}");
        `;

        return query;
    }

    /**
     * Gets all the point check ins from the data base
     */
    static GetAll() {
        let query = `SELECT id, userId, pointId, customers, checkInDate FROM pointcheckin;`;
        return query;
    }

    static GetAllPointCheckInsTypes() {
        let query = `SELECT types.name, points.id FROM pointcheckin 
                        LEFT JOIN (points 
                        LEFT JOIN pointandtypes ON points.id = pointandtypes.pointId
                        LEFT JOIN types ON types.id = pointandtypes.typeId) 
                        ON pointcheckin.pointId = points.id
                        ORDER BY types.name;`
        
        return query;
    }

    static GetAllPointCheckInCases() {
        let query = `SELECT * FROM pointcheckin 
		INNER JOIN confirmedcases ON pointcheckin.userId = confirmedcases.userId
        WHERE pointcheckin.checkInDate >= DATE_SUB(confirmedcases.date, INTERVAL 7 DAY) AND
        pointcheckin.checkInDate <= DATE_ADD(confirmedcases.date, INTERVAL 14 DAY);`;

        return query;
    }

    static GetAllWithPoints(queryParams = null)
    {
        let query = `SELECT pointcheckin.id, userId,pointId, customers, checkInDate, points.name FROM pointcheckin 
                        LEFT JOIN points ON pointcheckin.pointId = points.id `;

        // If there are query parameters...
        if(queryParams)
        {
            // Adds the where statement
            query += `WHERE `
            
            // Sets as the current index 0
            let index = 0;
            // Gets the entries from the query parameters
            let entries = Object.entries(queryParams)
            let length = entries.length;
            
            // For each key value pair in the JSON object...
            for (const [key, value] of entries) {
                let values = [];
                if(Array.isArray(value)) {
                    value.forEach(x => {
                        values.push(x); 
                        length++;
                    });
                    length--;
                }
                else
                    values.push(value);

                values.forEach(x => {
                    // Adds the key name to the string
                    query += `${key} `

                    // Splits the value at '.' 
                    let valueArray = x.split(".");

                    // If the value array's length i greater than 1...
                    if(valueArray.length > 1)
                    {
                        if(valueArray[0] === "lt")
                            query += "<= ";
                        else if(valueArray[0] === "gt")
                            query += ">= ";
                        
                        if(isNaN(valueArray[1]))
                            query += `\"${valueArray[1]}\" `
                        else
                            query += `${valueArray[1] }`
                    }
                    else
                    {
                        if(isNaN(valueArray[1]))
                            query += `= \"${x}\" `
                        else
                            query += `= ${x}`
                    }

                    if(index < length - 1)
                        query +=" AND ";
                    index++;
                });
            }
        }
        
        query += ";";
        return query;
    }
    /**
     * Gets all the point check ins and points from the data base
     */
     static GetAllPointsCheckInsPoints() {
        let query = `SELECT pointcheckin.id, userId, pointId, checkInDate, name FROM pointcheckin LEFT JOIN points ON pointcheckin.pointId = points.id;`;
        return query;
    }
    

    /**
     * Deletes all the point check ins from the data base
     */
    static DeleteAll() {
        let query = `DELETE FROM pointcheckin`;

        return query;
    }

    /**
     * Gets the point check ins for the point with id the specified @pointId from the data base
     * @param {string} pointId The point's id
     */
    static GetByPointId(pointId) {
        let query = `SELECT * FROM pointcheckin WHERE pointId = ${pointId};`;
        return query;
    }


}

module.exports = PointCheckIn;
