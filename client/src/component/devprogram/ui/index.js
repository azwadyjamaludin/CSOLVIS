import {makeStyles, withStyles} from "@material-ui/core/styles";
import drawerImage from "../../../assets/blue-concrete-textured-background.jpg";
import Button from "@material-ui/core/Button";
import paperImage from "../../../assets/white-concrete-wall.jpg";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 210;

const useStylesLayout = makeStyles((theme) => ({
    root: {
        display: "flex",
    },

    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundImage: 'url('+drawerImage+')',
            zIndex: theme.zIndex.drawer + 1,
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    nested: {
        paddingLeft: theme.spacing(10)
    },
    nested2: {
        paddingLeft: theme.spacing(2)
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },

    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#bcd4e6'
    },

    drawerContainer: {
        overflow: 'auto',
    },

    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },

    toolbarButtons: {
        marginLeft: "10%"
    },

    menuButton: {
        marginLeft: theme.spacing(8),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    paperBG2: {
        backgroundColor:"#faf0e6"
    },
    margin: {
        margin: theme.spacing(0.1),
    },
}));

const useStylesElements = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBG: {
        backgroundImage: 'url('+paperImage+')'
    },
    paperBG2: {
        backgroundColor:"#bcd4e6"
    },
    paperBG3: {
        backgroundColor:"#f5f5f5"
    },
    table: {
        minWidth: 650,
    },
    margin: {
        margin: theme.spacing(1),
    },
    margin2: {
        margin: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    input: {
        display: 'none',
    },
    resize:{
        fontSize:12
    },
}));

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', lineHeight: 1.5,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {boxShadow: 'none',
        },
        '&:active': {boxShadow: 'none',
        },
        '&:focus': {boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapOutlineButton = withStyles({
    root: {boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', border: '1px solid', lineHeight: 1.5,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#90ee90', borderColor: '#90ee90', boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none', backgroundColor: '#0062cc', borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapWhiteButton = withStyles({
    root: {boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', border: '1px solid', lineHeight: 1.5, backgroundColor: '#f5f5f5', borderColor: '#f5f5f5',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#90ee90', borderColor: '#90ee90', boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none', backgroundColor: '#0062cc', borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapGreenButton = withStyles({
    root: {boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', border: '1px solid', lineHeight: 1.5, backgroundColor: '#90ee90', borderColor: '#90ee90',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#f5f5f5', borderColor: '#f5f5f5', boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none', backgroundColor: '#f5f5f5', borderColor: '#f5f5f5',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const BootstrapYellowButton = withStyles({
    root: {boxShadow: 'none', textTransform: 'none', fontSize: 16, padding: '6px 12px', border: '1px solid', lineHeight: 1.5, backgroundColor: '#ffff00', borderColor: '#ffff00',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#f5f5f5', borderColor: '#f5f5f5', boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none', backgroundColor: '#0062cc', borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const StyledTextField = withStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        width: '100%',
        "& .MuiInputBase-root": {
            backgroundColor: '#000000',
            color: '#f5f5f5',
            fontWeight:'bold',
            fontSize: 12,
            "& input": {
                textAlign: "left",
            }
        }
    }
}))(TextField);

export default {useStylesLayout, useStylesElements, BootstrapButton, BootstrapOutlineButton, BootstrapWhiteButton, BootstrapGreenButton, BootstrapYellowButton, StyledTextField}