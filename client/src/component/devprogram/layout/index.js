import React, {Component, Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Hidden,
  Drawer,
  CssBaseline,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import logo from '../../../assets/CSOLVIS.png'
import Typography from '@material-ui/core/Typography';
import drawerImage from '../../../assets/blue-concrete-textured-background.jpg'

const drawerWidth = 210;

const styles = theme => ({
  root: {
    display: "flex",
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundImage: 'url('+drawerImage+')',
      //backgroundColor: '#c0c0c0',
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
    //backgroundColor: '#c0c0c0'

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
});

const BootstrapOutlineButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    //backgroundColor: '#0062cc',
    //borderColor: '#0062cc',
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

class DevLayout extends Component {
  state = {
    mobileOpen: false,
    lamModal:false,
    qsModal:false,
    qsModal2:false
  };


  render() {
    const {
      classes,
      location: { pathname },
      children
    } = this.props;
    const { mobileOpen } = this.state;

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
                <b>Place cursor in editor and click code pattern</b>
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
              >
                <Typography variant="subtitle2" noWrap >
                  do-while loop
                </Typography>
              </BootstrapOutlineButton>
            </div>
          </MenuList>
        </MenuList>
      </div>
    );
    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {/*<AppBar position={'fixed'} className={classes.appBar}>
            <Toolbar>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Hidden smDown>
                <div className={classes.toolbar}>
                  <img src={logo} height="50" />
                </div>
              </Hidden>
              <div >
              <Typography variant="h6" color="textPrimary">
                C SOLVIS
              </Typography>
              </div>
              <div className={classes.toolbarButtons}>
                <Button
                  variant="text"
                  color="primary"
                  className={classes.button}
                  component={Link} to={'/probdes/element/step1'}
                  type={'submit'}
                  //startIcon={<LiveHelpRoundedIcon />}
                  edge="start"
                  //onClick={this.handleFAQOpen}
                >
                  <Typography variant={'button'} display={'block'}>
                  Problem Solving
                  </Typography>
                </Button>{" "}&nbsp;&nbsp;

                <Button
                    variant="text"
                    color="primary"
                    className={classes.button}
                    component={Link} to={'/devprog/element/editor'}
                    type={'submit'}
                    //startIcon={<AccessibilityNewRoundedIcon /> }
                    edge="start"
                    //onClick={this.handleHelpOpen}
                >
                  <Typography variant={'button'} display={'block'}>
                    Develop Program
                  </Typography>
                </Button>{" "}&nbsp;&nbsp;

                <Button
                    variant="text"
                    color="primary"
                    className={classes.button}
                    component={Link} to={'/help/element/info'}
                    //startIcon={<LiveHelpRoundedIcon />}
                    edge="start"
                    //onClick={this.handleFAQOpen}
                >
                  <Typography variant={'button'} display={'block'}>
                    Help
                  </Typography>
                </Button>{" "}&nbsp;&nbsp;

              </div>
            </Toolbar>
          </AppBar>*/}
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
            {/*<div className={classes.toolbar} />*/}
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default compose(withRouter, withStyles(styles))(DevLayout);
