import React, {Component, Fragment, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Drawer,
  CssBaseline,
  MenuList,
  MenuItem,
  Divider, Backdrop, Paper
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fade, makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import drawerImage from '../../assets/bg-perintis.jpg'
import logo from '../../assets/logo-and-wordmark.png'
import LiveHelpRoundedIcon from '@material-ui/icons/LiveHelpRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Typography from '@material-ui/core/Typography';
import LocalActivityRoundedIcon from '@material-ui/icons/LocalActivityRounded';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    display: "flex",
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: '100%',//`calc(100% - ${drawerWidth}px)`,
      marginLeft: 0,
      backgroundImage: 'url('+drawerImage+')',
      zIndex: theme.zIndex.drawer + 1,
    }
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
    paddingLeft: theme.spacing(7)
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
    color: "blueGrey"

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
    marginLeft: "auto"
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

class Layout extends Component {
  state = {
    mobileOpen: false,
    lamModal:false,
    qsModal:false,
    qsModal2:false
  };
  handleLAMOpen = () => {
    this.setState({lamModal:true})
  }

  handleLAMClose = () => {
    this.setState({lamModal:false})
  }

  handleFAQOpen = () => {
    this.setState({qsModal:true})
  }

  handleHelpOpen = () => {
    this.setState({qsModal2:true})
  }

  handleFAQClose = () => {
    this.setState({qsModal:false})
  }

  handleHelpClose = () => {
    this.setState({qsModal2:false})
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
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
        <div className={classes.toolbar}>
          {/*<img src={logo} height="50" />*/}
        </div>
        <MenuList>
          <MenuList>
          <MenuItem component={Link} to="/" selected={"/" === pathname}>
            <HomeSharpIcon /> &nbsp; Home
          </MenuItem>
        </MenuList>
          <Divider/>
          <Divider/>
          <MenuList>
          </MenuList>
          <MenuList>
          </MenuList>
        </MenuList>
      </div>
    );

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position={'fixed'} className={classes.appBar}>
            <Toolbar>
              <Hidden smDown>
                <div className={classes.toolbar}>
                  <img src={logo} height="50" />
                </div>
              </Hidden>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div >
              <Typography variant="h6" color="textPrimary">
                PERINTIS Universal Well-being Encyclopedia
              </Typography>
              </div>
              <div className={classes.toolbarButtons}>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  startIcon={<LiveHelpRoundedIcon />}
                  edge="end"
                  onClick={this.handleFAQOpen}
                >
                  <Typography variant={'button'} display={'block'}>
                  FAQ'S
                  </Typography>
                </Button>{" "}&nbsp;&nbsp;
                <Backdrop className={classes.backdrop} open={this.state.qsModal} /*disableBackdropClick={true}*/ >
                  <Paper variant={'elevation'}>
                    <Typography >
                      FAQ
                      <br/>
                      <Button
                          variant="outlined"
                          color="secondary"
                          type={'submit'}
                          onClick={this.handleFAQClose}
                      >
                        close
                      </Button>
                    </Typography>
                  </Paper>
                </Backdrop>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    startIcon={<AccessibilityNewRoundedIcon /> }
                    edge="end"
                    onClick={this.handleHelpOpen}
                >
                  <Typography variant={'button'} display={'block'}>
                    HELP
                  </Typography>
                </Button>
                <Backdrop className={classes.backdrop} open={this.state.qsModal2} /*disableBackdropClick={true}*/ >
                  <Paper variant={'elevation'}>
                    <Typography >
                      Help
                      <br/>
                      <Button
                          variant="outlined"
                          color="secondary"
                          type={'submit'}
                          onClick={this.handleHelpClose}
                      >
                        close
                      </Button>
                    </Typography>
                  </Paper>
                </Backdrop>
              </div>
            </Toolbar>
          </AppBar>
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
            {<div className={classes.toolbar} />}
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default compose(withRouter, withStyles(styles))(Layout);
