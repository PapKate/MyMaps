import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";


const theme = createTheme({
    palette: {
        primary: {
          light: '#9cc9e1',
          main: '#84BCDA',
          dark: '#5c8398',
          contrastText: '#F5F5F5',
        },
        secondary: {
          light: '#f4cd71',
          main: '#F2C14E',
          dark: '#a98736',
          contrastText: '#F5F5F5',
        }
    },
});

export default function SingleDatePicker({OnDateChanged}) {
    const [date, setDate] = useState(null);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                        OnDateChanged(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}