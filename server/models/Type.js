/**
 * Represents the types in the database
 */
class Type{

    constructor(name) {
        this.name = name;
    }

    async Create() {
        let query = `INSERT INTO types(name)
            VALUES('${this.name}');`;

        return query;
    }

    static GetAll() {
        let query = "SELECT * FROM types;";

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM types WHERE id = ${id};`;

        return query;
    }

    /**
     * Updates the name
     * @param {int} id 
     * @param {string} newName
     * @returns 
     */
    static Update(id, newName) {
        let query = `UPDATE types SET name = ${newName}, 
                                  WHERE id = ${id};`;

        return query;
    }
}

module.exports = Type;