const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point and type in the database
 */
class PointAndType{

    constructor(id, pointId, typeId) {
        this.id = id;
        this.pointId = pointId;
        this.typeId = typeId;
    }

    constructor(pointId, typeId) {
        this.pointId = pointId;
        this.typeId = typeId;
    }

    async Create() {

        let sql = `
            INSERT INTO pointandtypes(pointId, typeId)
            VALUES('${this.pointId}', '${this.typeId}');
        `;

        return db.execute(sql);
    }

    static GetAll() {
        let sql = `SELECT * FROM pointandtypes`;

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM pointandtypes WHERE id = ${id};`;

        return db.execute(sql);
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @param 
     * @param 
     * @returns 
     */
    static Update(id, newPointId, newTypeId) {

        let sql = `UPDATE users SET pointId = ${newPointId}, 
                                    typeId = ${newTypeId}                               
                    WHERE id = ${id};`;

        return db.execute(sql);
    }
}

module.exports = PointAndType;