import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {AppBar, Toolbar, Hidden, Drawer, CssBaseline, MenuList, MenuItem, Button, Typography} from "@material-ui/core";
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import logo from '../../../assets/CSOLVIS.png'
import UIIndex from "../ui/index"

function ProbLayout(props) {
    const classes = UIIndex.useStylesLayout();

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
