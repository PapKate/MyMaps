/**
 * Represents a Confirmed Case from a request
 */
 class ConfirmedCase{

    constructor(userId, date) {
        this.userId = userId;
        this.date = date;
    }

    Create() {

        let query = `
            INSERT INTO confirmedcases(userId, date)
            VALUES('${this.userId}', '${this.date}');
        `;

         return query;
    }

    static GetAll() {
        let query = `SELECT * FROM confirmedcases`;

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM confirmedcases WHERE id = ${id};`;

        return query;
    }

    static GetAllConfirmedCasesCaseWasHere() {
        let query = `SELECT pointcheckin.userId, pointcheckin.checkInDate, pointcheckin.pointId, confirmedcasesdata.caseWasThere, points.name FROM pointcheckin
                        LEFT JOIN points ON pointcheckin.pointId = points.id,
                    (SELECT pointcheckin.pointId AS pointId, confirmedcases.date AS confirmedCaseDate, pointcheckin.checkInDate AS caseWasThere FROM confirmedcases 
                        LEFT JOIN pointcheckin ON confirmedcases.userId = pointcheckin.userId
                        WHERE confirmedcases.date >= "2022-08-05 15:00:00") AS confirmedcasesdata
                    WHERE pointcheckin.userId = 76 
                    AND pointcheckin.pointId = confirmedcasesdata.pointId
                    AND (DATE_SUB(confirmedcasesdata.confirmedCaseDate, INTERVAL 2 HOUR) <= pointcheckin.checkInDate 
                    OR pointcheckin.checkInDate  <= DATE_ADD(confirmedcasesdata.confirmedCaseDate, INTERVAL 2 HOUR));`;

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