/**
 * Represents a Confirmed Case from a request
 */
 class ConfirmedCase{

    /**
     ** Default constructor
     * @param {int} userId The user's id
     * @param {Date} date The date
     */
    constructor(userId, date) {
        this.userId = userId;
        this.date = date;
    }

    /**
     ** Creates an insert user query from the model
     */
    Create() {

        let query = `INSERT INTO confirmedcases(userId, date)
                        VALUES('${this.userId}', '${this.date}');`;

         return query;
    }

    /**
     ** Creates an insert for bulk data query
     * @param {string} valuesString The values as a string
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO confirmedcases(userId, date)
                     VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the confirmed cases query
     */
    static GetAll() {
        let query = `SELECT * FROM confirmedcases ORDER BY date DESC`;

        return query;
    }

    /**
     ** Gets the confirmed case with the given id query
     */
    static GetById(id) {
        let query = `SELECT * FROM confirmedcases WHERE id = ${id};`;

        return query;
    }

    /**
     * Gets all the check in of a user with id the given id that are +-2 hours from a confirmed case's check in 
     * That are up to 7 days before the given date
     */
    static GetAllConfirmedCasesCaseWasHere(queryParams) {
        let query = `SELECT pointcheckin.userId, pointcheckin.checkInDate, pointcheckin.pointId, confirmedcasesdata.caseWasThere, points.name FROM pointcheckin
                        LEFT JOIN points ON pointcheckin.pointId = points.id,
                    (SELECT pointcheckin.pointId AS pointId, confirmedcases.date AS confirmedCaseDate, pointcheckin.checkInDate AS caseWasThere FROM confirmedcases 
                        LEFT JOIN pointcheckin ON confirmedcases.userId = pointcheckin.userId
                        WHERE confirmedcases.date >= DATE_SUB(${queryParams.date}, INTERVAL 7 DAY)) AS confirmedcasesdata
                    WHERE pointcheckin.userId = ${queryParams.userId} 
                    AND pointcheckin.pointId = confirmedcasesdata.pointId
                    AND (DATE_SUB(confirmedcasesdata.caseWasThere, INTERVAL 2 HOUR) <= pointcheckin.checkInDate 
                    AND pointcheckin.checkInDate  <= DATE_ADD(confirmedcasesdata.caseWasThere, INTERVAL 2 HOUR))
                    AND (DATE_SUB(${queryParams.date}, INTERVAL 7 DAY) <= pointcheckin.checkInDate 
                    AND pointcheckin.checkInDate  <= DATE_ADD(${queryParams.date}, INTERVAL 7 DAY));`;

        return query;
    }

    /**
     ** Gets all the types that are in a check in of a confirmed case 
     */
    static GetAllConfirmedCasesTypes() {
        let query = `SELECT types.name, confirmedcases.userId FROM pointcheckin 
                        INNER JOIN confirmedcases ON pointcheckin.userId = confirmedcases.userId
                        LEFT JOIN (points 
                        LEFT JOIN pointandtypes ON points.id = pointandtypes.pointId
                        LEFT JOIN types ON types.id = pointandtypes.typeId) 
                        ON pointcheckin.pointId = points.id
                        WHERE pointcheckin.checkInDate >= DATE_SUB(confirmedcases.date, INTERVAL 7 DAY) AND
                        pointcheckin.checkInDate <= DATE_ADD(confirmedcases.date, INTERVAL 14 DAY)
                        ORDER BY types.name;    `;
        return query;
    }

    /**
     * The update query for a confirmed case
     * @param {int} id The id
     * @param {Date} newDate The date
     * @returns 
     */
    static UpdateById(id, newDate) {

        let query = `UPDATE confirmedcases SET date = "${newDate}"                               
                    WHERE id = ${id};`;

        return query;
    }

    /**
     * The delete query for deleting a case
     * @param {int} id The id
     */
    static DeleteById(id) {
        let query = `DELETE FROM confirmedcases WHERE id = ${id};`;

        return query;
    }
}

module.exports = ConfirmedCase;