/**
 * Represents a point in the database
 */
 class PointResponseModel{

    constructor(id, name, address, coordinatesId, rating, ratingNumber, currentPopularity, timeSpentId, dateCreated, dateModified) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.coordinatesId = coordinatesId;
        this.rating = rating;
        this.ratingNumber = ratingNumber;
        this.currentPopularity = currentPopularity;
        this.timeSpentId = timeSpentId;  
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }
}

module.exports = PointResponseModel;
