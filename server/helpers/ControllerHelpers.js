class ControllerHelpers{

    /**
     * Gets the current date as a string
     * @returns Returns the current date as a string
     */
    static GetCurrentDate()
    {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let dateToString = `${year}-${month}-${day}`;

        return dateToString;
    }

    /**
     * Gets the current date time and formats it as a string
     * @returns The date as a string
     */
    static GetCurrentDateTime()
    {
        let date = new Date();

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
     ** Checks if a string is null or empty  
     * @param {string} string The string
     * @returns TRUE if null or empty 
     */
    static IsNullOrEmpty(string)
    {
        // If the string is empty...
        if(string === "")
            // Return true
            return true;
        
        // Return false
        return false;
    }

}

module.exports = ControllerHelpers;
