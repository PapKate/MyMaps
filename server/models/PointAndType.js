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
            VALUES("${this.pointId}", ${this.typeId});
        `;

        return sql;
    }

    static GetAll() {
        let sql = `SELECT * FROM pointandtypes`;

        return sql;
    }

    static GetById(id) {
        let sql = `SELECT * FROM pointandtypes WHERE id = ${id};`;

        return sql;
    }

    /**
     * Updates the username and the password
     * @param {int} id 
     * @param 
     * @param 
     * @returns 
     */
    static UpdateById(id, newPointId, newTypeId) {

        let sql = `UPDATE pointandtypes SET pointId = "${newPointId}", 
                                    typeId = ${newTypeId}                            
                    WHERE id = ${id};`;

        return sql;
    }

    static DeleteById(id) {
        let sql = `DELETE FROM pointandtypes WHERE id = ${id};`;

        return sql;
    }

}

module.exports = PointAndType;