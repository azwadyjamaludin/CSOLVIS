import {makeStyles} from "@material-ui/core/styles";
import paperImage from "../../../assets/white-concrete-wall.jpg";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStylesIPO = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        backgroundColor:"#bcd4e6"
    },
    paperBG: {
        backgroundImage: 'url('+paperImage+')'
    },
    paperBG2: {
        backgroundColor:"#bcd4e6"
    },
    table: {
        minWidth: 650,
    },
}));

const useStylesSteps = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paperBG: {
        backgroundColor:"#f5f5f5"
    },
    paperBG2: {
        backgroundColor:"#bcd4e6"
    },
    table: {
        minWidth: 650,
    },
}));

const drawerWidth = 210;

const useStylesLayout = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            //backgroundImage: 'url('+drawerImage+')',
            backgroundColor: '#bcd4e6',
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
    margin: {
        margin: theme.spacing(0.1),
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
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },

    drawerPaper: {
        width: drawerWidth,
        //backgroundImage: 'url('+drawerImage+')',
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
        marginLeft: '5%'
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
    }
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
        '&:hover': {
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

export default {useStylesIPO,useStylesSteps, useStylesLayout, BootstrapButton}
