/**
 * Represents a user in the database
 */
 class UserResponseModel{

    constructor(id, username, email, password, dateCreated, dateModified) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
    }
}

module.exports = UserResponseModel;
