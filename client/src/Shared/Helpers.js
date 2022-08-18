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
}

export default Helpers;
