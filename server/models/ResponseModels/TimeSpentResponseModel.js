/**
 * Represents the timespent in the database
 */

 class TimeSpentResponseModel{

    constructor(id, minValue, maxValue) {
        this.id = id;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}

module.exports = TimeSpentResponseModel;