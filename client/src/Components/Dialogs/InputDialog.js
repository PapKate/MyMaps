import { useState } from "react";
import { Modal, Box, makeStyles } from '@material-ui/core';
import Constants from '../../Shared/Constants';
import TextButton from '../Buttons/TextButton';
import IconTextInput from '../Inputs/IconTextInput';

const useStyles = makeStyles({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1em',
    },
    dialogIconCircle: {
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgContainer: {
        width: '3rem',
        height: '3rem',
    },
    dialogText: { 
        margin: 0,
        fontFamily: Constants.FontFamily,
        fontSize: '24px',
        color: `#${Constants.Gray}`,
        fontWeight: 400
    },
    dialogTitle: {
        fontFamily: Constants.FontFamily,
        fontSize: '24px',
        fontWeight: 600
    },
    dialogButtons: {
        display: 'flex',
        gap: '4em',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 'auto',
    backgroundColor: `#${Constants.White}`,
    boxShadow: Constants.BoxShadow,
    borderRadius: '8px',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

const InputDialog = ({
    Color = Constants.White,
    BackColor = Constants.LightBlue,
    VectorSource,
    IsOpen, 
    IsOpenHandler,
    YesOnClick,
    NoOnClick
}) => {
    // Material UI Styles
    const classes = useStyles();
    
    const dialogCircleStyle = {
        backgroundColor: `#${BackColor}`
    }

    const titleStyle = {
        color: `#${BackColor}`
    }

    const [numberOfValues, setNumberOfValues] = useState("");
    
    /**
     ** Sets the number of values as the value in the text input
    */
     const OnNumberOfValuesChanged = event => {
        setNumberOfValues(event.target.value);
    }

    return(
        <Modal open={IsOpen} onClose={IsOpenHandler}>
            <Box sx={style}>
                <div className={classes.dialogContent}>
                    <div className={classes.dialogIconCircle} style={dialogCircleStyle}>
                        <svg className={classes.svgContainer} viewBox="0 0 24 24">
                            <path fill={`#${Color}`} d={VectorSource} />
                        </svg>
                    </div>
                    <span className={classes.dialogTitle} style={titleStyle}>Dummy data</span>
                    <span className={classes.dialogText}>Please enter the number of new users to add to the database.</span>
                    <IconTextInput  Text={numberOfValues}
                                    OnTextChanged={OnNumberOfValuesChanged}
                                    HasFullWidth={true}
                                    VectorSource={Constants.Database} 
                                    Hint='Number of new values'/>
                    <div className={classes.dialogButtons}>
                        <TextButton OnClick={NoOnClick}
                                    IsRaised={false} 
                                    Text="Cancel" 
                                    Color={Constants.Red} 
                                    BackColor={Constants.VeryLightRed} />
                        <TextButton OnClick={() => YesOnClick(parseInt(numberOfValues))}
                                    IsRaised={false} 
                                    Text="Enter" 
                                    Color={Constants.Green} 
                                    BackColor={Constants.VeryLightGreen}/>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default InputDialog;
