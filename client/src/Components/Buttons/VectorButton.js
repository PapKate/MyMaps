import { IconButton, makeStyles } from '@material-ui/core';

import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
    vectorButtonContainer: {
        width: '100%',
        height: '100%',
        padding: '0.5rem',
        boxShadow: `${Constants.BoxShadow}`
    },
    vectorButtonContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgContainer: {
        width: '100%',
        height: '100%',
    }
});


const VectorButton = ({ 
    OnClick,
    VectorSource, 
    BorderRadius = '50%',
    Size = '3rem',
    Color = Constants.White,
    BackColor = Constants.LightBlue
}) => {
    // Material UI Styles
    const classes = useStyles();
    
    const menuButtonStyle = {
        width: `${Size}`,
        height: `${Size}`,
        color: `#${Color}`,
        backgroundColor: `#${BackColor}`,
        borderRadius: {BorderRadius}
    };
    
    return(
        <IconButton id="vectorButton" className={classes.vectorButtonContainer} style={menuButtonStyle}
            onClick={OnClick}>
            <div className={classes.vectorButtonContent}>
                <svg className={classes.svgContainer} viewBox="0 0 24 24">
                    <path fill={`#${Color}`} d={VectorSource} />
                </svg>
                <span className="menuButtonText">{Text}</span>
            </div>
        </IconButton>
    );
};

export default VectorButton;