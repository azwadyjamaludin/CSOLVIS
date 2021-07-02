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
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import logo from '../../../assets/CSOLVIS.png'
import Typography from '@material-ui/core/Typography';
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

const BootstrapOutlineButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
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
      backgroundColor: '#90ee90',
      borderColor: '#90ee90',
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

function DevLayout(props) {
    const classes = useStyles()
    /*const {
      classes,
      location: { pathname },
      children
    } = props;
    //const { mobileOpen } = this.state;*/

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
              <Typography className={classes.nested2} variant="body2" >
                <b>Place cursor after the last line and click code pattern</b>
              </Typography>
              <br/>
          <MenuItem >
          <DescriptionRoundedIcon fontSize={'default'} color={'secondary'}/> &nbsp;&nbsp;
            <Typography variant="subtitle1" noWrap >
             Code Pattern
            </Typography>
          </MenuItem>
            <div align={'center'}>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button1'}
                 >
                <Typography variant="subtitle2" noWrap >
                  include stdio.h
                </Typography>
              </BootstrapOutlineButton>
              <br/>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button2'}
              >
                <Typography variant="subtitle2" noWrap >
                  main()
                </Typography>
              </BootstrapOutlineButton>
              <br/>
             <BootstrapOutlineButton
                 color={'primary'}
                 className={classes.margin}
                 type={'submit'}
                 component={Link} to={'/devprog/element/button3'}
               >
               <Typography variant="subtitle2" noWrap >
                 declare variables
               </Typography>
             </BootstrapOutlineButton>
             <br/>
             <BootstrapOutlineButton
                 color={'primary'}
                 className={classes.margin}
                 type={'submit'}
                 component={Link} to={'/devprog/element/button4'}
               >
               <Typography variant="subtitle2" noWrap >
                 insert formulas
               </Typography>
             </BootstrapOutlineButton>
             <br/>
                <BootstrapOutlineButton
                    color={'primary'}
                    className={classes.margin}
                    type={'submit'}
                    component={Link} to={'/devprog/element/button5'}
                >
                  <Typography variant="subtitle2" noWrap >
                    printf
                  </Typography>
                </BootstrapOutlineButton>
              <br/>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button6'}
              >
                <Typography variant="subtitle2" noWrap >
                  scanf
                </Typography>
              </BootstrapOutlineButton>
              <br/>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button7'}
              >
                <Typography variant="subtitle2" noWrap >
                  if else
                </Typography>
              </BootstrapOutlineButton>
              <br/>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button8'}
              >
                <Typography variant="subtitle2" noWrap >
                  for loop
                </Typography>
              </BootstrapOutlineButton>
              <br/>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button9'}
              >
                <Typography variant="subtitle2" noWrap >
                  while loop
                </Typography>
              </BootstrapOutlineButton>
              <br/>
              <BootstrapOutlineButton
                  color={'primary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button10'}
              >
                <Typography variant="subtitle2" noWrap >
                  do-while loop
                </Typography>
              </BootstrapOutlineButton>
            </div>
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
export default DevLayout;
