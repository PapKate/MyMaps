class Helpers {

    /**
     * Gets the current date time and formats it as a string
     * @returns The date as a string
     */
    static FormatDateTime(date)
    {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let dateToString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return dateToString;
    }

    /**
     * Gets the @date and returns the full date 
     * @param {Date} date The date
     * @returns The date time with 00:00:00
     */
    static GetFullDate(date)
    {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        let dateToString = `${year}-${month}-${day}`;
        return new Date(year, month, day);
    }

    static GetFullDateToString(date)
    {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${year}-${month}-${day}`;
    }

}

export default Helpers;
