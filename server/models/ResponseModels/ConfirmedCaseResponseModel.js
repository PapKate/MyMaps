/**
 * Represents a confirmed case in the database
 */
 class ConfirmedCaseResponseModel{

    constructor(id,userId, date) {
        this.id = id;
        this.userId = userId;
        this.date = date;
    }
}

module.exports = ConfirmedCaseResponseModel;
