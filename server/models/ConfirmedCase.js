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

    /*
    static GetByUserId(userId) {
        let sql = `SELECT * FROM confirmedcases WHERE userId = ${userId};`;

        return db.execute(sql);
    }
    */

    static UpdateById(id, newDate) {

        let query = `UPDATE confirmedcases SET name = ${newDate},                               
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