import { TextField, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

import Constants from "../../Shared/Constants";

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

const textInputStyle = {
    boxShadow: Constants.BoxShadow,
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: `#${Constants.White}`
};

const TextInput = ({ 
        Text, 
        OnTextChanged, 
        Hint = "hint", 
        HasFloatingHint = false,
        HasFullWidth = false,
        Theme = theme,
        ThemeColor = "primary" 
    }) => {
    return(
        <div className="textInput" >
            <ThemeProvider theme={Theme}>
                <TextField id="input-textfield" style={textInputStyle}
                        color={ThemeColor}
                        variant="outlined" 
                        value={Text}
                        onChange={OnTextChanged}
                        label={Text === "" ? Hint : ""} 
                        InputLabelProps={{ shrink: HasFloatingHint }} 
                        fullWidth={HasFullWidth}/>
            </ThemeProvider>
        </div>
    );
};

export default TextInput;
