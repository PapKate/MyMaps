/**
 * Represents a point and type in the database
 */
 class PointAndTypeResponseModel{

    constructor(id, pointId, typeId) {
        this.id = id;
        this.pointId = pointId;
        this.typeId = typeId;
    }
}

module.exports = PointAndTypeResponseModel;
