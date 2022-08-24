import { makeStyles } from "@material-ui/core";
import Constants from "../Shared/Constants";

const useStyles = makeStyles({
    titleAndTextContainer: {
        position: "relative",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "left",
        gap: "12px",
        fontFamily: Constants.FontFamily
    },
    title: {
        fontWeight: 600,
        margin: 0
    },
    text : {
        marginLeft: "16px"
    }
});

const TitleAndText = ({Title, Text, IsTitleBold = true}) => {
    // Material UI Styles
    const classes = useStyles();
    return ( 
        <div className={classes.titleAndTextContainer}>
            <h3 className={classes.title} style={IsTitleBold ? {"fontWeight" : 600} : {"fontWeight" : 400}}>{Title}</h3>
            <span className={classes.text} style={IsTitleBold ? {"fontWeight" : 400} : {"fontWeight" : 600}}>{Text}</span>
        </div>
    );
}

export default TitleAndText;
