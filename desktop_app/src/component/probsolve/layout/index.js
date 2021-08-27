import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Hidden, Drawer, CssBaseline, MenuList, MenuItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import logo from '../../../assets/CSOLVIS.png'
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {CopyToClipboard} from "react-copy-to-clipboard";
import TextField from "@material-ui/core/TextField";


const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
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



function ProbLayout(props) {
    const classes = useStyles();

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
            </MenuItem>
            <MenuItem >
            </MenuItem>
            <MenuItem >
            </MenuItem>
          <MenuItem >
            <KeyboardRoundedIcon fontSize={'default'} color={'secondary'}/> &nbsp;&nbsp;
            <Typography variant="body1" noWrap >
             Problem Design
            </Typography>
          </MenuItem>
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
          <AppBar position={'fixed'} className={classes.appBar}>
            <Toolbar>
              <div className={classes.toolbarButtons}>
                <Button
                  variant="text"
                  color="secondary"
                  component={Link} to={'/probdes/element/step1'}
                  type={'submit'}
                  edge="start"
                >
                  <Typography variant={'button'} display={'block'}>
                  Problem Solving
                  </Typography>
                </Button>{" "}&nbsp;&nbsp;

                <Button
                    variant="text"
                    color="secondary"
                    component={Link} to={'/devprog/element/dev'}
                    type={'submit'}
                    edge="start"
                >
                  <Typography variant={'button'} display={'block'}>
                    Develop Program
                  </Typography>
                </Button>{" "}&nbsp;&nbsp;

                <Button
                    variant="text"
                    color="secondary"
                    component={Link} to={'/help/element/info'}
                    edge="start"
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
            {<div />}
            {props.children}
          </main>
        </div>
      </Fragment>
    );
}

export default ProbLayout;
