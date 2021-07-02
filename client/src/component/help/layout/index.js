import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {
  Hidden,
  Drawer,
  CssBaseline,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import logo from '../../../assets/CSOLVIS.png'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import drawerImage from '../../../assets/blue-concrete-textured-background.jpg'

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
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
    paddingLeft: theme.spacing(5)
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundImage: 'url('+drawerImage+')',

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
  margin: {
    margin: theme.spacing(0.1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const BootstrapTextButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
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
      backgroundColor: '#f5f5f5',
      borderColor: '#f5f5f5',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

function HelpLayout(props) {
  const classes = useStyles()
    /*const {
      classes,
      location: { pathname },
      children
    } = props;*/
    //const { mobileOpen } = this.state;

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {<img src={logo} height="50" />}&nbsp;&nbsp;&nbsp;
            <Typography variant="h6" color="textPrimary">
              C SOLVIS
            </Typography>
          </div>
        </Hidden>
        <MenuList>
         <MenuList>

           <MenuItem >
             <SettingsRoundedIcon fontSize={'default'} color={'secondary'}/> &nbsp;&nbsp;
             <Typography variant="subtitle1" noWrap >
                Preference
             </Typography>
           </MenuItem>
             <div align={'center'}>
             <BootstrapTextButton
                 className={classes.margin}
                 component={Link} to={'/help/element/info'}
                 type={'submit'}>
             <Typography variant="subtitle2" noWrap >
               C SOLVIS Info
             </Typography>
             </BootstrapTextButton>
               <BootstrapTextButton
                   className={classes.margin}
                   component={Link} to={'/help/element/setting'}
                   type={'submit'}>
             <Typography variant="subtitle2" noWrap >
               C SOLVIS Setting
             </Typography>
               </BootstrapTextButton>
             </div>
          </MenuList>
         <MenuList>
         </MenuList>
        </MenuList>
      </div>
      )

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open={true}
              >
                <div className={classes.drawerContainer}>
                {drawer}
                </div>
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            {props.children}
          </main>
        </div>
      </Fragment>
    );
}
export default HelpLayout;
