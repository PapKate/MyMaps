const db = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents a coordinate in the database
 */
class Coordinate{

    constructor(id,lat,lng) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
    }

    constructor(lat,lng) {
        this.lat = lat;
        this.lng = lng;
    }

    async Create() {
        
        let sql = `
            INSERT INTO coordinates(lat,lng)
            VALUES('${this.lat}', '${this.lng}');
        `;

        return db.execute(sql);    
    }

    static GetAll() {
        let sql = `SELECT * FROM coordinates`;

        return db.execute(sql);
    }

    static GetById(id) {
        let sql = `SELECT * FROM coordinates WHERE id = ${id};`;

        return db.execute(sql);
    }

}

module.exports = Coordinate;