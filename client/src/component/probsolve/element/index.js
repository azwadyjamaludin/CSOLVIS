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
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const BootstrapWhiteButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#f5f5f5',
        borderColor: '#f5f5f5',
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


function ProbElement() {
    let {params} = useParams();
    const sesID = sessionStorage.getItem('sessionID')

    const [IPO,setIPO] = useState([]);
    const URL = `http://${sessionStorage.getItem('ipsett')}`;  const [copied, setCopied] = useState(false)

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
        }).catch(function (error) {
            SweetAlertSetting(error)
        })
    }

    const SweetAlertSetting =(error) => {
        Swal.fire({
            icon: 'error',
            title: '',
            text: `${error}`,
        }).then((r) => {
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
                SweetAlertSetting('No data found in the given session, Please create a new session or you may try to insert the previous session id (Help/setting)')
            } else {
            setIPO(res.data.storedIPO)
            }
        }).catch(function (error) {
            SweetAlertSetting(error)
        })
        }
    }



        return (
            <div align={'center'}>
                <br/><br/><br/>
                <TitleIndex />
                <div>
                {params === 'step1'?
                    <Step1 IPOData={dataSubmitted} />
                    :null}
                {params === 'step2'?
                    <Step2 IPOData={dataSubmitted} />
                    :null}
                {params === 'step3'?
                    <Step3 IPOData={dataSubmitted} />
                    :null}
                {params === 'step4'?
                    <Step4 IPOData={dataSubmitted} />
                    :null}
                {params === 'step5'?
                    <Step5 IPOData={dataSubmitted} />
                    :null}
                {params === 'step6'?
                    <Step6 IPOData={dataSubmitted} />
                    :null}
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
                <BootstrapWhiteButton
                    color="secondary"
                >
                    Copy Session ID
                </BootstrapWhiteButton>
                    </CopyToClipboard>
                    &nbsp;&nbsp;
                    {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                    <p>*Please click the copy button to copy the generated session ID to your Notepad etc</p>
                </div>
            </div>

        )
}
export default ProbElement
