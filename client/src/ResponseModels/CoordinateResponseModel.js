/**
 * Represents a coordinate in the database
 */
 class CoordinateResponseModel{

    constructor(id,lat,lng) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
    }
}

module.exports = CoordinateResponseModel;
