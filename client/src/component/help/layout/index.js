import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Hidden, Drawer, CssBaseline, MenuList, MenuItem, Typography} from "@material-ui/core";
import logo from '../../../assets/CSOLVIS.png'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import UIIndex from "../ui/index"

function HelpLayout(props) {
  const classes = UIIndex.useStylesLayout()

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
             <UIIndex.BootstrapTextButton
                 color={'secondary'}
                 className={classes.margin}
                 component={Link} to={'/help/element/info'}
                 type={'submit'}>
             <Typography variant="subtitle2" noWrap >
               C SOLVIS Info
             </Typography>
             </UIIndex.BootstrapTextButton>
               <UIIndex.BootstrapTextButton
                   color={'secondary'}
                   className={classes.margin}
                   component={Link} to={'/help/element/setting'}
                   type={'submit'}>
             <Typography variant="subtitle2" noWrap >
               C SOLVIS Setting
             </Typography>
               </UIIndex.BootstrapTextButton>
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
