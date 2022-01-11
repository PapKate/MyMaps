/**
 * Represents a coordinate from a request
 */
class Coordinate{

    constructor(lat,lng) {
        this.lat = lat;
        this.lng = lng;
    }

    Create() {
        
        let query = `
            INSERT INTO coordinates(lat,lng)
            VALUES('${this.lat}', '${this.lng}');
        `;

        return query;    
    }

    static GetAll() {
        let query = `SELECT * FROM coordinates`;

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM coordinates WHERE id = ${id};`;

        return query;
    }

    static UpdateById(id, newLat, newLng) {

        let query = `UPDATE coordinates SET lat = ${newLat}, 
                                      lng = ${newLng}, 
                    WHERE id = ${id};`;

        return query;
    }

    static DeleteById(id) {
        let query = `DELETE FROM coordinates WHERE id = ${id};`;

        return query;
    }
}

module.exports = Coordinate;