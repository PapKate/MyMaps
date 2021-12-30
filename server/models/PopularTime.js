//const db = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

/**
 * Represents the populartimes in the database
 */

class PopularTime{

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

    async Create() {
        let query = `
            INSERT INTO populartimes(id, name, hour00, hour01, hour02, hour03, hour04, hour05, hour06, hour07, hour08, hour09, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17, hour18, hour19, hour20, hour21, hour22, hour23, pointId)
            VALUES('${this.name}', '${this.hour00}', '${this.hour01}', '${this.hour02}', '${this.hour03}', '${this.hour04}', '${this.hour05}', '${this.hour06}', '${this.hour07}', '${this.hour08}', '${this.hour09}', '${this.hour10}', '${this.hour11}', '${this.hour12}', '${this.hour13}', '${this.hour14}', '${this.hour15}', '${this.hour16}', '${this.hour17}', '${this.hour18}', '${this.hour19}', '${this.hour20}', '${this.hour21}', '${this.hour22}', '${this.hour23}', '${this.pointId}');
        `;

        return query;
    }

    static GetAll() {
        let query = "SELECT * FROM populartimes";

        return query;
    }

    static GetById(id) {
        let query = `SELECT * FROM populartimes WHERE id = ${id};`;

        return query;
    }

    static GetByPointId(pointId) {
        let query = `SELECT * FROM populartimes WHERE id = ${pointId};`;

        return query;
    }

    /**
     * Updates the hours
     * @param {int} id 
     * @param {int} newHour00
     * @param {int} newHour01     
     * @param {int} newHour02      
     * @param {int} newHour03      
     * @param {int} newHour04     
     * @param {int} newHour05     
     * @param {int} newHour06       
     * @param {int} newHour07      
     * @param {int} newHour08      
     * @param {int} newHour09 
     * @param {int} newHour10
     * @param {int} newHour11
     * @param {int} newHour12
     * @param {int} newHour13
     * @param {int} newHour14
     * @param {int} newHour15
     * @param {int} newHour16
     * @param {int} newHour17
     * @param {int} newHour18
     * @param {int} newHour19
     * @param {int} newHour20
     * @param {int} newHour21
     * @param {int} newHour22
     * @param {int} newHour23
     * @returns 
     */

    static Update(id, newHour00, newHour01, newHour02, newHour03, newHour04, newHour05, newHour06, newHour07, newHour08, newHour09, newHour10, newHour11, newHour12, newHour13, newHour14, newHour15, newHour16, newHour17, newHour18, newHour19, newHour20, newHour21, newHour22, newHour23) {

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
                    WHERE id = ${id};`;

        return query;
    }
}

module.exports = PopularTime;