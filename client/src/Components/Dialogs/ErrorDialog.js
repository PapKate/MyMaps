import { Modal, Box, makeStyles } from '@material-ui/core';
import Constants from '../../Shared/Constants';

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

const ErrorDialog = ({
    Text,
    Color = Constants.Red,
    BackColor = Constants.VeryLightRed,
    VectorSource,
    IsOpen, 
    IsOpenHandler
}) => {
    // Material UI Styles
    const classes = useStyles();
    
    const dialogCircleStyle = {
        backgroundColor: `#${BackColor}`
    }

    const titleStyle = {
        color: `#${Color}`
    }

    return(
        <Modal 
        open={IsOpen}
        onClose={IsOpenHandler}>
            <Box sx={style}>
                <div className={classes.dialogContent}>
                    <div className={classes.dialogIconCircle} style={dialogCircleStyle}>
                        <svg className={classes.svgContainer} viewBox="0 0 24 24">
                            <path fill={`#${Color}`} d={VectorSource} />
                        </svg>
                    </div>
                    <span className={classes.dialogTitle} style={titleStyle}>ERROR</span>
                    <span className={classes.dialogText}>{Text}</span>
                </div>
            </Box>
        </Modal>
    );
};

export default ErrorDialog;
