/**
 * Represents a point and type from a request
 */
 class PointAndType{

    constructor(pointId, typeId) {
        this.pointId = pointId;
        this.typeId = typeId;
    }

    /**
     ** Create a pair
     */
    Create() {

        let sql = `
            INSERT INTO pointandtypes(pointId, typeId)
            VALUES("${this.pointId}", ${this.typeId});
        `;

        return sql;
    }

    /**
     ** Creates multiple values
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO pointandtypes(pointId, typeId)
                        VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the pairs 
     */
    static GetAll() {
        let sql = `SELECT pointId, types.name FROM pointandtypes
        LEFT JOIN types on pointandtypes.typeId = types.id;`;

        return sql;
    }

    /**
     ** Gets the point and type pair with id the given id 
     * @param {int} id The id
     */
    static GetById(id) {
        let sql = `SELECT * FROM pointandtypes WHERE id = ${id};`;

        return sql;
    }

    /**
     ** Updates the username and the password
     */
    static UpdateById(id, newPointId, newTypeId) {

        let sql = `UPDATE pointandtypes SET pointId = "${newPointId}", 
                    typeId = ${newTypeId}                            
                    WHERE id = ${id};`;

        return sql;
    }

    /**
     ** Deletes the pair with the given point id
     * @param {string} pointId The id
     */
    static DeleteById(pointId) {
        let sql = `DELETE FROM pointandtypes WHERE pointId = "${pointId}";`;

        return sql;
    }
}

module.exports = PointAndType;