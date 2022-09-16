/**
 * Represents a Confirmed Case from a request
 */
 class ConfirmedCase{

    constructor(userId, date) {
        this.userId = userId;
        this.date = date;
    }

    Create() {

        let query = `INSERT INTO confirmedcases(userId, date)
                        VALUES('${this.userId}', '${this.date}');`;

         return query;
    }

    static GetAll() {
        let query = `SELECT * FROM confirmedcases ORDER BY date DESC`;

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM confirmedcases WHERE id = ${id};`;

        return query;
    }

    static GetAllConfirmedCasesCaseWasHere(queryParams) {
        let query = `SELECT pointcheckin.userId, pointcheckin.checkInDate, pointcheckin.pointId, confirmedcasesdata.caseWasThere, points.name FROM pointcheckin
                        LEFT JOIN points ON pointcheckin.pointId = points.id,
                    (SELECT pointcheckin.pointId AS pointId, confirmedcases.date AS confirmedCaseDate, pointcheckin.checkInDate AS caseWasThere FROM confirmedcases 
                        LEFT JOIN pointcheckin ON confirmedcases.userId = pointcheckin.userId
                        WHERE confirmedcases.date >= DATE_SUB(${queryParams.date}, INTERVAL 7 DAY)) AS confirmedcasesdata
                    WHERE pointcheckin.userId = ${queryParams.userId} 
                    AND pointcheckin.pointId = confirmedcasesdata.pointId
                    AND (DATE_SUB(confirmedcasesdata.caseWasThere, INTERVAL 2 HOUR) <= pointcheckin.checkInDate 
                    AND pointcheckin.checkInDate  <= DATE_ADD(confirmedcasesdata.caseWasThere, INTERVAL 2 HOUR));`;

        return query;
    }

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

    /*
    static GetByUserId(userId) {
        let sql = `SELECT * FROM confirmedcases WHERE userId = ${userId};`;

        return db.execute(sql);
    }
    */

    static UpdateById(id, newDate) {

        let query = `UPDATE confirmedcases SET date = "${newDate}"                               
                    WHERE id = ${id};`;

        return query;
    }

    static DeleteById(id) {
        let query = `DELETE FROM confirmedcases WHERE id = ${id};`;

        return query;
    }

    /*
    static DeleteByUserId(userId) {
        let sql = `DELETE FROM confirmedcases WHERE userId = ${userId};`;

        return db.execute(sql);
    }
    */
}

module.exports = ConfirmedCase;