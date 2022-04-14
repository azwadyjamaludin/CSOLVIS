import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Hidden, Drawer, CssBaseline, MenuList, MenuItem} from "@material-ui/core";
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import logo from '../../../assets/CSOLVIS.png'
import Typography from '@material-ui/core/Typography';
import UIIndex from '../ui/index.js'

function DevLayout(props) {
    const classes = UIIndex.useStylesLayout()

    const drawer = (
      <div>
          <Hidden smDown>
              <div className={classes.toolbar}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {<img src={logo} height="50"  alt={'logo'}/>}&nbsp;&nbsp;&nbsp;
                  <Typography variant="h6" color="textPrimary">
                      C SOLVIS
                  </Typography>
              </div>
          </Hidden>
        <MenuList>
         <MenuList>
              <Typography className={classes.nested2} variant="body2" >
                Place cursor on the last line of editor and click the code pattern
              </Typography>
              <br/>
          <MenuItem >
          <DescriptionRoundedIcon fontSize={'default'} color={'secondary'}/> &nbsp;&nbsp;
            <Typography variant="subtitle1" noWrap >
             Code Pattern
            </Typography>
          </MenuItem>
            <div align={'center'}>
              <UIIndex.BootstrapWhiteButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button1'}
                 >
                <Typography variant="subtitle2" noWrap >
                  include stdio.h
                </Typography>
              </UIIndex.BootstrapWhiteButton>
              <br/>
                <UIIndex.BootstrapWhiteButton
                    color={'secondary'}
                    className={classes.margin}
                    type={'submit'}
                    component={Link} to={'/devprog/element/button3'}
                >
                    <Typography variant="subtitle2" noWrap >
                        declare variables
                    </Typography>
                </UIIndex.BootstrapWhiteButton>
                <br/>
              <UIIndex.BootstrapGreenButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button2-1'}
              >
                <Typography variant="subtitle2" noWrap >
                    {'main {'}
                </Typography>
              </UIIndex.BootstrapGreenButton>
              <br/>
             <UIIndex.BootstrapOutlineButton
                 color={'secondary'}
                 className={classes.margin}
                 type={'submit'}
                 component={Link} to={'/devprog/element/button4'}
               >
               <Typography variant="subtitle2" noWrap >
                 insert formulas
               </Typography>
             </UIIndex.BootstrapOutlineButton>
             <br/>
                <UIIndex.BootstrapOutlineButton
                    color={'secondary'}
                    className={classes.margin}
                    type={'submit'}
                    component={Link} to={'/devprog/element/button5'}
                >
                  <Typography variant="subtitle2" noWrap >
                    printf
                  </Typography>
                </UIIndex.BootstrapOutlineButton>
              <br/>
              <UIIndex.BootstrapOutlineButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button6'}
              >
                <Typography variant="subtitle2" noWrap >
                  scanf
                </Typography>
              </UIIndex.BootstrapOutlineButton>
              <br/>
              <UIIndex.BootstrapOutlineButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button7'}
              >
                <Typography variant="subtitle2" noWrap >
                  if else
                </Typography>
              </UIIndex.BootstrapOutlineButton>
              <br/>
              <UIIndex.BootstrapOutlineButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button8'}
              >
                <Typography variant="subtitle2" noWrap >
                  for loop
                </Typography>
              </UIIndex.BootstrapOutlineButton>
              <br/>
              <UIIndex.BootstrapOutlineButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button9'}
              >
                <Typography variant="subtitle2" noWrap >
                  while loop
                </Typography>
              </UIIndex.BootstrapOutlineButton>
              <br/>
              <UIIndex.BootstrapOutlineButton
                  color={'secondary'}
                  className={classes.margin}
                  type={'submit'}
                  component={Link} to={'/devprog/element/button10'}
              >
                <Typography variant="subtitle2" noWrap >
                  do-while loop
                </Typography>
              </UIIndex.BootstrapOutlineButton>
                <br/>
                <UIIndex.BootstrapGreenButton
                    color={'secondary'}
                    className={classes.margin}
                    type={'submit'}
                    component={Link} to={'/devprog/element/button2-2'}
                >
                    <Typography variant="subtitle2" noWrap >
                        {'return 0 }'}
                    </Typography>
                </UIIndex.BootstrapGreenButton>
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
