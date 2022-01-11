import { Button, makeStyles } from '@material-ui/core';

import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
    textButtonContainer: {
        minWidth: '5rem',
        width: 'auto',
        height: 'auto',
        padding: '4px',
    },
    svgContainer: {
        width: '100%',
        height: '100%',
    },
    textButtonContent: {
        height: '100%',
        width: '100%',
        textTransform: 'capitalize',
        fontFamily: Constants.FontFamily,
        fontWeight: 600,
        fontSize: '140%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const TextButton = ({ 
    Text,
    OnClick,
    BorderRadius = '50%',
    Color = Constants.White,
    BackColor = Constants.LightBlue,
    IsRaised = true
}) => {
    // Material UI Styles
    const classes = useStyles();
    
    const textButtonStyle = {
        color: `#${Color}`,
        backgroundColor: `#${BackColor}`,
        borderRadius: {BorderRadius},
        boxShadow: `${IsRaised ? Constants.BoxShadow : ""}` 
    };
    
    return(
        <Button id="textButton" className={classes.textButtonContainer} style={textButtonStyle}
            onClick={OnClick}>
            <div className={classes.textButtonContent}>
                <span>{Text}</span>
            </div>
        </Button>
    );
};

export default TextButton;