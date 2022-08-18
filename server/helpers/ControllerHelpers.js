class ControllerHelpers{

    static  FormatQueryFromParams(queryParams)
    {
        // Adds the where statement
        let query = `WHERE `
            
        // Sets as the current index 0
        let index = 0;
        // Gets the entries from the query parameters
        let entries = Object.entries(queryParams)
        let length = entries.length;
        
        // For each key value pair in the JSON object...
        for (const [key, value] of entries) {
            let values = [];
            if(Array.isArray(value)) {
                value.forEach(x => {
                    values.push(x); 
                    length++;
                });
                length--;
            }
            else
                values.push(value);

            values.forEach(x => {
                // Adds the key name to the string
                query += `${key} `

                // Splits the value at '.' 
                let valueArray = x.split(".");

                // If the value array's length i greater than 1...
                if(valueArray.length > 1)
                {
                    if(valueArray[0] === "lt")
                        query += "<= ";
                    else if(valueArray[0] === "gt")
                        query += ">= ";
                    
                    if(isNaN(valueArray[1]))
                        query += `\"${valueArray[1]}\" `
                    else
                        query += `${valueArray[1] }`
                }
                else
                {
                    if(isNaN(x))
                        query += `= \"${x}\" `
                    else
                        query += `= ${x}`
                }

                if(index < length - 1)
                    query +=" AND ";
                index++;
            });

            return query;
        }
    }

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
