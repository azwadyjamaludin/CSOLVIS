import React, {Component, Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Hidden,
  Drawer,
  CssBaseline,
  MenuList,
  MenuItem,
  Divider
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import Typography from '@material-ui/core/Typography';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import logo from '../../assets/CSOLVIS.png'


const drawerWidth = 210;

const styles = theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: '100%',//`calc(100% - ${drawerWidth}px)`,
      marginLeft: 0,
      //backgroundImage: 'url('+drawerImage+')',
      backgroundColor: '#c0c0c0;',
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
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },

  drawerPaper: {
    width: drawerWidth,
    //backgroundImage: 'url('+drawerImage+')',
    backgroundColor: '#c0c0c0;'

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
  }
});

class Layout extends Component {
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
        <div className={classes.toolbar}>
          {/*<img src={logo} height="50" />*/}
        </div>
        <MenuList>
          <MenuList>
            <Divider/>
            <Divider/>
            <Divider/>
            <Divider/>
          <MenuItem > {/*component={Link} to="" selected={"/pages/articles" === pathname}>*/}
            <Typography variant="body1" noWrap >
            <DescriptionRoundedIcon fontSize={'default'} color={'secondary'}/> &nbsp; Problem Design
            </Typography>
          </MenuItem>
            <MenuItem className={classes.nested} component={Link} to="/probdes/step1" selected={"/probdes/step1" === pathname}>
              <Typography variant="subtitle2" noWrap >
              Step 1 ->
              </Typography>
            </MenuItem>
            <MenuItem className={classes.nested} component={Link} to="/probdes/step2" selected={"/probdes/step2" === pathname}>
              <Typography variant="subtitle2" noWrap >
              Step 2 ->
              </Typography>
            </MenuItem>
            <MenuItem className={classes.nested} component={Link} to="/probdes/step3" selected={"/probdes/step3" === pathname}>
              <Typography variant="subtitle2" noWrap >
              Step 3 ->
              </Typography>
            </MenuItem>
            <MenuItem className={classes.nested} component={Link} to="/probdes/step4" selected={"/probdes/step4" === pathname}>
              <Typography variant="subtitle2" noWrap >
              Step 4 ->
              </Typography>
            </MenuItem>
            <MenuItem className={classes.nested} component={Link} to="/probdes/step5" selected={"/probdes/step5" === pathname}>
              <Typography variant="subtitle2" noWrap >
              Step 5 ->
              </Typography>
            </MenuItem>
            <MenuItem className={classes.nested} component={Link} to="/probdes/step6" selected={"/probdes/step6" === pathname}>
              <Typography variant="subtitle2" noWrap >
              Step 6 ->
              </Typography>
            </MenuItem>
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
          <AppBar position={'absolute'} className={classes.appBar}>
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
                  component={Link} to={'/probdes/step1'}
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
                    component={Link} to={'/devprog/editor'}
                    //startIcon={<AccessibilityNewRoundedIcon /> }
                    type={'submit'}
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
                    component={Link} to={'/help/info'}
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
            {/*<div className={classes.toolbar} />*/}
            {children}
          </main>
        </div>
      </Fragment>
    );
  }
}

export default compose(withRouter, withStyles(styles))(Layout);
