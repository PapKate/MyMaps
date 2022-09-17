/**
 * Represents the types in the database
 */
class Type{

    /**
     ** Default constructor
     * @param {string} name The name
     */
    constructor(name) {
        this.name = name;
    }

    /**
     ** Creates a type 
     */
    Create() {
        let query = `INSERT INTO types(name) VALUES('${this.name}');`;

        return query;
    }

    /**
     * Creates multiple types
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO types(name) VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the types 
     */
    static GetAll() {
        let query = "SELECT * FROM types;";

        return query;
    }

    /**
     ** Gets the type with the given id 
     * @param {int} id The id
     */
    static GetById(id) {
        let query = `SELECT * FROM types WHERE id = "${id}";`;

        return query;
    }

    /**
     ** Updates the name
     * @param {int} id 
     * @param {string} newName
     * @returns 
     */
    static Update(id, newName) {
        let query = `UPDATE types SET name = "${newName}"
                                  WHERE id = ${id};`;

        return query;
    }

    /**
     ** Deletes the type
     * @param {int} id 
     * @returns 
     * 
     */
    static DeleteById(id) {

        let query = `DELETE FROM types WHERE id = ${id};`;

        return query;
    }
}

module.exports = Type;