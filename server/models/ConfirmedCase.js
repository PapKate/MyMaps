const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a Confirmed Case in the database
 */
class Confirmedcase{

    constructor(id,userId, date) {
        this.id = id;
        this.userId = userId;
        this.date = date;
    }

    constructor(userId, date) {
        this.userId = userId;
        this.date = date;
    }

    async Create() {

        let sql = `
            INSERT INTO confirmedcases(userId, date)
            VALUES('${this.userId}', '${this.date}');
        `;

         return db.execute(sql);
    }

    static GetAll() {
        let sql = `SELECT * FROM confirmedcases`;

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM confirmedcases WHERE id = ${id};`;

        return db.execute(sql);
    }


    static GetByUserId(userId) {
        let sql = `SELECT * FROM confirmedcases WHERE userId = ${userId};`;

        return db.execute(sql);
    }

}

module.exports = ConfirmedCases;