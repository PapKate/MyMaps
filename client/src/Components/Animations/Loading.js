import { makeStyles } from '@material-ui/core';

import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
    loader: {
        position: "relative",
        top: "-60px",
        width: "120px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        boxSizing: "border-box",
        "&::after": {
            content: "''",  
            position: "absolute",
            width: "120px",
            height: "120px",
            left: 0,
            bottom: 0,
            boxSizing: "border-box",
            borderRadius: "50% 50% 0",
            border: `36px solid  var(--BackColor)`,
            transform: "rotate(45deg) translate(0, 0)",
            boxSizing: "border-box",
            animation: "animMarker 0.4s ease-in-out infinite alternate"
           
        },
        "&::before": {
            content: "''",  
            position: "absolute",
            width: "60px",
            height: "8px",
            top: '150%',
            left: 0,
            bottom: 0,
            margin: "auto 30px",
            boxSizing: "border-box",
            borderRadius: "50%",
            background: "rgba(0, 0, 0, 0.2)",
            animation: "animShadow 0.4s ease-in-out infinite alternate"
        }
    }
});

const Loading = ({BackColor = Constants.Red}) => {
    // Material UI Styles
    const classes = useStyles();
    return ( 
        <span className={classes.loader} style={{"--BackColor" : `#${BackColor}`}}></span>
    );
}

export default Loading;


