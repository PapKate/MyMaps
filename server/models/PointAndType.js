const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a point and type from a request
 */
class PointAndType{

    constructor(pointId, typeId) {
        this.pointId = pointId;
        this.typeId = typeId;
    }

    Create() {

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
    static UpdateById(id, newPointId, newTypeId) {

        let sql = `UPDATE pointandtypes SET pointId = ${newPointId}, 
                                    typeId = ${newTypeId}                               
                    WHERE id = ${id};`;

        return db.execute(sql);
    }

    static DeleteById(id) {
        let sql = `DELETE FROM pointandtypes WHERE id = ${id};`;

        return db.execute(sql);
    }

}

module.exports = PointAndType;