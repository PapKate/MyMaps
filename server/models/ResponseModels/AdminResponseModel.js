/**
 * Represents an admin in the database
 */
 class AdminResponseModel{

    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }
}

module.exports = AdminResponseModel;