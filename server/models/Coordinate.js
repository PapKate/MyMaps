/**
 * Represents a coordinate from a request
 */
 class Coordinate{

    /**
     ** Default constructor
     * @param {double} lat The latitude
     * @param {double} lng The longtitude
     */
    constructor(lat,lng) {
        this.lat = lat;
        this.lng = lng;
    }

    /**
     ** Creates a new coordinate 
     */
    Create() {
        
        let query = `
            INSERT INTO coordinates(lat,lng)
            VALUES('${this.lat}', '${this.lng}');
        `;

        return query;    
    }

    /**
     ** Bulk insert query 
     * @param {string} valuesString The values 
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO coordinates(lat,lng) VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the coordinates 
     */
    static GetAll() {
        let query = `SELECT * FROM coordinates`;

        return query;
    }

    /**
     ** Gets the coordinate with the given id 
     * @param {int} id The id
     */
    static GetById(id) {
        let query = `SELECT * FROM coordinates WHERE id = ${id};`;

        return query;
    }

    /**
     * Updates the coordinate with the given id
     * @param {int} id The id
     * @param {double} newLat 
     * @param {double} newLng 
     */
    static UpdateById(id, newLat, newLng) {

        let query = `UPDATE coordinates SET lat = ${newLat}, 
                                            lng = ${newLng}
                    WHERE id = ${id};`;

        return query;
    }

    /**
     ** Deletes the coordinate with the given id 
     * @param {int} id The id
     */
    static DeleteById(id) {
        let query = `DELETE FROM coordinates WHERE id = ${id};`;

        return query;
    }
}

module.exports = Coordinate;