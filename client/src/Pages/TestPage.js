import { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

import Constants from "../Shared/Constants";
import IconTextInput from "../Components/Inputs/IconTextInput";
import VectorButton from "../Components/Buttons/VectorButton";
import TextButton from "../Components/Buttons/TextButton";
import ErrorDialog from "../Components/Dialogs/ErrorDialog";
import MessageDialog from "../Components/Dialogs/MessageDialog";


const marginStyle = {
  margin: '2em'
};

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

const TestPage = () => {

  const [text, setText] = useState("");

  const [errorDialog_IsOpen, errorDialog_SetIsOpen] = useState(false);
  const [messageDialog_IsOpen, messageDialog_SetIsOpen] = useState(false);


  // On text changed event
  const OnTextChanged = event => {
      setText(event.target.value);
  };

  const ErrorDialog_IsOpenHandler = () => errorDialog_SetIsOpen(!errorDialog_IsOpen);
  const MessageDialog_IsOpenHandler = () => messageDialog_SetIsOpen(!messageDialog_IsOpen);

  return (
    <>
        <ThemeProvider theme={theme}>
            <div className="testPageContent">

            <div style={marginStyle}>
                <IconTextInput Text={text} OnTextChanged={OnTextChanged} 
                VectorSource={Constants.AccountCircle} />
            </div>
            <span>{text}</span>

            <div style={marginStyle}>
                <VectorButton Size="3.5rem" BackColor={Constants.Red}
                            VectorSource={Constants.PlusThick}
                            OnClick={ErrorDialog_IsOpenHandler} />
            </div>

            <div style={marginStyle}>
                <VectorButton Size="3.5rem" 
                            BackColor={Constants.Blue}
                            VectorSource={Constants.ExitToApp}
                            OnClick={MessageDialog_IsOpenHandler} />
            </div>


            <div style={marginStyle}>
                <div>
                <TextButton IsRaised={false} Text="No" Color={Constants.Red} BackColor={Constants.VeryLightRed}/>
                </div>
            </div>

            <div style={marginStyle}>
                <div>
                <TextButton IsRaised={false} Text="Yes" Color={Constants.Green} BackColor={Constants.VeryLightGreen}/>
                </div>
            </div>

            <ErrorDialog Text={"Error! Please fill out every input and try again!"}
                            IsOpen={errorDialog_IsOpen} 
                            IsOpenHandler={ErrorDialog_IsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                            />

            <MessageDialog  Title={"Log Out"}
                            Text={"Are you sure you want to log out?"}
                            IsOpen={messageDialog_IsOpen} 
                            IsOpenHandler={MessageDialog_IsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                            Color={Constants.Blue}
                            BackColor={Constants.LightBlue}
                            YesOnClick={()=> {MessageDialog_IsOpenHandler(); console.log("Yes!"); }}
                            NoOnClick={()=> {MessageDialog_IsOpenHandler(); console.log("No!"); }}/>
            </div>
        </ThemeProvider>
    </>
  );
}

export default TestPage;
