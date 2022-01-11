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
    dialogInputs: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
        width: '100%'
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    maxWidth: '600px',
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

const EditUserDataDialog = ({
    IsOpen, 
    IsOpenHandler,
}) => {
    // Material UI Styles
    const classes = useStyles();
    
    const dialogCircleStyle = {
        backgroundColor: `#${Constants.VeryLightRed}`
    }

    const titleStyle = {
        color: `#${Constants.Gray}`
    }

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    /**
     ** Sets the newUsername as the value in the text input
    */
    const OnNewUsernameChanged = event => {
        setNewUsername(event.target.value);
    }

    /**
     ** Sets the newPassword as the value in the text input
    */
    const OnNewPasswordChanged = event => {
        setNewPassword(event.target.value);
    }

    /**
     ** Sets the confirmPassword as the value in the text input
    */
    const OnConfirmPasswordChanged = event => {
        setConfirmPassword(event.target.value);
    }

    /**
     ** Sets the currentPassword as the value in the text input
    */
    const OnCurrentPasswordChanged = event => {
        setCurrentPassword(event.target.value);
    }

    /**
     ** Clears all data from the inputs
    */
    const ClearData = () =>{
        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
        setCurrentPassword("");
    }

    /**
     ** Closes the dialog
    */
    const CloseDialog = () => {
        // Clears all text inputs
        ClearData();
        // Closes the dialog
        IsOpenHandler();
    }

    return(
        <Modal open={IsOpen} onClose={CloseDialog}>
            <Box component="form" sx={style}>
                <div className={classes.dialogContent}>
                    <div className={classes.dialogIconCircle} style={dialogCircleStyle}>
                        <svg className={classes.svgContainer} viewBox="0 0 24 24">
                            <path fill={`#${Constants.Gray}`} d={Constants.AccountEdit} />
                        </svg>
                    </div>
                    <span className={classes.dialogTitle} style={titleStyle}>Edit profile</span>
                    <div className={classes.dialogInputs}>
                        <IconTextInput  Text={newUsername}
                                        OnTextChanged={OnNewUsernameChanged}
                                        HasFullWidth={true}
                                        VectorSource={Constants.Account} 
                                        Hint='New username'/>
                        <IconTextInput  Text={newPassword}
                                        OnTextChanged={OnNewPasswordChanged}
                                        Type={"password"}
                                        HasFullWidth={true}
                                        VectorSource={Constants.KeyVariant} 
                                        Hint='New password'/>
                        <IconTextInput  Text={confirmPassword}
                                        OnTextChanged={OnConfirmPasswordChanged}
                                        Type={"password"}
                                        HasFullWidth={true}
                                        VectorSource={Constants.KeyVariant} 
                                        Hint='Confirm password'/>
                        <IconTextInput  Text={currentPassword}
                                        OnTextChanged={OnCurrentPasswordChanged}
                                        HasFullWidth={true}
                                        VectorSource={Constants.KeyVariant} 
                                        Hint='Current password'/>

                        <TextButton Text={"Save"}/>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default EditUserDataDialog;
