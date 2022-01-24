/**
 * Represents the populartimes in the database
 */

class PopularTimeResponseModel{

    constructor(id, name, hour00, hour01, hour02, hour03, hour04, hour05, hour06, hour07, hour08, hour09, hour10, hour11, hour12, hour13, hour14, hour15, hour16, hour17, hour18, hour19, hour20, hour21, hour22, hour23, pointId) {
        this.id = id;
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
}

    module.exports = PopularTimeResponseModel;