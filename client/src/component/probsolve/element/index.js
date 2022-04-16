import React, {useEffect, useState} from 'react'
import TitleIndex from "./title";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import IPOIndex from "./ipo";
import axios from "axios";
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Box, Tab, Tabs, TextField, Typography} from "@material-ui/core";
import UIIndex from "../ui/index"
import UIAlertIndex from "../uiAlert/index"

function TabPanel(props){
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function ProbElement() {

    const classes = UIIndex.useStyles();
    const sesID = sessionStorage.getItem('sessionID'); const [IPO,setIPO] = useState([]); const URL = `${sessionStorage.getItem('IPAddress')}`;
    const [copied, setCopied] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    const dataSubmitted = (IPOData) => {
        setIPO(IPOData)
        console.log(IPO)
    }

    useEffect(() => {
        getStoredIPOData()
    },[])

    const onClickReset = async() => {
        const data = {sessionID:sessionStorage.getItem('sessionID')}
        await axios.post(URL+'/routes/dataMgt/deleteRows',data).then((res)=> {
            setIPO(res.data.ipo)
            axios.post(URL + '/routes/fileMgt/removeLogFiles',data).then((res) => {

            }).catch(function (error) {
                UIAlertIndex.SweetAlertSetting(error)
            })
        }).catch(function (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
                UIAlertIndex.SweetAlertSetting(error)
            }
        })
    }

    const copySessionID = () => {
        setCopied(true)
        console.log(copied)
    }

    const getStoredIPOData = () => {
        if (sessionStorage.getItem('sessionID')) {
        const data= {sessionID:sessionStorage.getItem('sessionID')}
        axios.post(URL+'/routes/dataMgt/getStoredIPOData', data).then((res) => {
            if (res.data.emptyData) {
                UIAlertIndex.SweetAlertSetting('No data found in the given session, Please create a new session or you may try to insert the previous session id (Help/setting)')
            } else {
            setIPO(res.data.storedIPO)
            }
        }).catch(function (error) {
            if (!error.status) {
                UIAlertIndex.SweetAlertSetting('Cannot communicate with server. Please check the network (Help > Preference > C SOLVIS Setting)')
            } else {
            UIAlertIndex.SweetAlertSetting(error)
            }
        })
        }
    }

        return (
            <div align={'center'}>
                <br/><br/><br/>
                <TitleIndex />
                <div className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="fullWidth"
                        scrollButtons="auto"
                        //aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Step1" {...a11yProps(0)}/>
                        <Tab label="Step2" {...a11yProps(1)}/>
                        <Tab label="Step3" {...a11yProps(2)}/>
                        <Tab label="Step4" {...a11yProps(3)}/>
                        <Tab label="Step5" {...a11yProps(4)}/>
                        <Tab label="Step6" {...a11yProps(6)}/>
                    </Tabs>
                        <TabPanel value={value} index={0} >
                            <Step1 IPOData={dataSubmitted} />
                        </TabPanel>
                        <TabPanel value={value} index={1} >
                            <Step2 IPOData={dataSubmitted} />
                        </TabPanel>
                        <TabPanel value={value} index={2} >
                            <Step3 IPOData={dataSubmitted} />
                        </TabPanel>
                        <TabPanel value={value} index={3} >
                            <Step4 IPOData={dataSubmitted} />
                        </TabPanel>
                        <TabPanel value={value} index={4} >
                            <Step5 IPOData={dataSubmitted} />
                        </TabPanel>
                        <TabPanel value={value} index={5} >
                            <Step6 IPOData={dataSubmitted} />
                        </TabPanel>
                </div>
                <br/>
                <IPOIndex ipos={IPO} resetBut={onClickReset}/>
                <br/><br/><br/><br/>
                <div align={'left'}>
                    <TextField id={'sesID'}
                               placeholder={'Session ID'}
                               name={'id_session'}
                               variant={'outlined'}
                               color={'primary'}
                               value={sesID}
                               size={'small'}
                               style={{
                                   backgroundColor: '#FFFAFA',
                                   width: 500,
                                   textAlign:'left'
                               }}

                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;

                <CopyToClipboard text={sesID} onCopy={copySessionID}>
                    <UIIndex.BootstrapWhiteButton
                        color="secondary"
                    >
                        Copy Session ID
                    </UIIndex.BootstrapWhiteButton>
                </CopyToClipboard>
                &nbsp;&nbsp;
                {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                <p>*Please click the copy button to copy the generated session ID to your Notepad etc</p>
                </div>
            </div>

        )
}
export default ProbElement
