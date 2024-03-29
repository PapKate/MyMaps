/**
 ** Represents the populartimes in the database
 */
class PopularTime {

    constructor(name, hour00, hour01, hour02, hour03, hour04, hour05, hour06, hour07, hour08, hour09, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17, hour18, hour19, hour20, hour21, hour22, hour23, pointId) {
        this.name = name;
        this.hour00 = hour00;
        this.hour01 = hour01;
        this.hour02 = hour02;
        this.hour03 = hour03;
        this.hour04 = hour04;
        this.hour05 = hour05;
        this.hour06 = hour06;
        this.hour07 = hour07;
        this.hour08 = hour08;
        this.hour09 = hour09;
        this.hour10 = hour10;
        this.hour11 = hour11;
        this.hour12 = hour12;
        this.hour13 = hour13;
        this.hour14 = hour14;
        this.hour15 = hour15;
        this.hour16 = hour16;
        this.hour17 = hour17;
        this.hour18 = hour18;
        this.hour19 = hour19;
        this.hour20 = hour20;
        this.hour21 = hour21;
        this.hour22 = hour22;
        this.hour23 = hour23;
        this.pointId = pointId;
    }

    /**
     ** Creates a popular time 
     */
    Create() {
        let query = `
            INSERT INTO populartimes(name, hour00, hour01, hour02, hour03, hour04, hour05, hour06, hour07, hour08, hour09, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17, hour18, hour19, hour20, hour21, hour22, hour23, pointId)
            VALUES('${this.name}', '${this.hour00}', '${this.hour01}', '${this.hour02}', '${this.hour03}', '${this.hour04}', '${this.hour05}', '${this.hour06}', '${this.hour07}', '${this.hour08}', '${this.hour09}', '${this.hour10}', '${this.hour11}', '${this.hour12}', '${this.hour13}', '${this.hour14}', '${this.hour15}', '${this.hour16}', '${this.hour17}', '${this.hour18}', '${this.hour19}', '${this.hour20}', '${this.hour21}', '${this.hour22}', '${this.hour23}', '${this.pointId}');
        `;
        return query;
    }

    /**
     ** Creates multiple values 
     * @param {string} valuesString The values
     */
    static BulkCreate(valuesString) {
        let query = `INSERT INTO populartimes(name, hour00, hour01, hour02, hour03, hour04, hour05, hour06, hour07, hour08, hour09, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17, hour18, hour19, hour20, hour21, hour22, hour23, pointId)
                        VALUES ${valuesString};`;

        return query;
    }

    /**
     ** Gets all the popular times and points
     */
    static GetAll() {
        let query = `SELECT points.id, points.name, points.address, points.currentPopularity, points.rating, points.ratingNumber, 
                        coordinates.lat, coordinates.lng,
                        timespent.maxValue, timespent.minValue,
                        populartimes.name as "day", populartimes.hour00, populartimes.hour01, populartimes.hour02, populartimes.hour03, populartimes.hour04, populartimes.hour05, populartimes.hour06, populartimes.hour07, 
                        populartimes.hour08, populartimes.hour09, populartimes.hour10, populartimes.hour11, populartimes.hour12, populartimes.hour13, populartimes.hour14, populartimes.hour15, populartimes.hour16, 
                        populartimes.hour17, populartimes.hour18, populartimes.hour19, populartimes.hour20, populartimes.hour21, populartimes.hour22, populartimes.hour23
                    FROM populartimes LEFT JOIN (points  
                    LEFT JOIN timespent on points.timespentId = timespent.id 
                    LEFT JOIN coordinates on points.coordinatesId = coordinates.id)
                    on points.id = populartimes.pointId;`;

        return query;
    }

    /**
     ** Gets a popular time from the data base with the given id 
     * @param {int} id The id
     */
    static GetById(id) {
        let query = `SELECT * FROM populartimes WHERE id = ${id};`;

        return query;
    }

    /**
     ** Gets  the popular times with point id the given id
     * @param {string} pointId The point's id
     */
    static GetByPointId(pointId) {
        let query = `SELECT * FROM populartimes WHERE id = "${pointId}";`;

        return query;
    }

    /**
     ** Deletes all the popular times 
     */
    static DeleteAll() {
        let query = `DELETE FROM populartimes;`

        return query
    }

    /**
     ** Updates the hours
     */
    static Update(id, newHour00, newHour01, newHour02, newHour03, newHour04, newHour05, newHour06, newHour07, newHour08, newHour09, newHour10, newHour11, newHour12, newHour13, newHour14, newHour15, newHour16, newHour17, newHour18, newHour19, newHour20, newHour21, newHour22, newHour23, newPointId) {

        let query = `UPDATE users SET hour00 = ${newHour00},
                                    hour01 = ${newHour01}, 
                                    hour02 = ${newHour02},
                                    hour03 = ${newHour03},
                                    hour04 = ${newHour04},
                                    hour05 = ${newHour05},
                                    hour06 = ${newHour06},
                                    hour07 = ${newHour07},
                                    hour08 = ${newHour08},
                                    hour09 = ${newHour09},
                                    hour10 = ${newHour10},
                                    hour11 = ${newHour11},
                                    hour12 = ${newHour12},
                                    hour13 = ${newHour13},
                                    hour14 = ${newHour14},
                                    hour15 = ${newHour15},
                                    hour16 = ${newHour16},
                                    hour17 = ${newHour17},
                                    hour18 = ${newHour18},
                                    hour19 = ${newHour19},
                                    hour20 = ${newHour20},
                                    hour21 = ${newHour21},
                                    hour22 = ${newHour22},
                                    hour23 = ${newHour23},
                                    pointId = ${newPointId}
                    WHERE id = ${id};`;

        return query;
    }

    /**
     ** Deletes the popular times
     * @param {int} pointId 
     */
         static DeleteById(pointId) {

            let query = `DELETE FROM populartimes WHERE pointId = "${pointId}";`;
   
           return query;
       }
}

module.exports = PopularTime;