import React, {useState} from 'react'
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

    const [IPO,setIPO] = useState([]); const [sesID, setSesID] = useState('');
    const URL = `http://${sessionStorage.getItem('ipsett')}`;  const [copied, setCopied] = useState(false)

    let newSessionID = ''

    const dataSubmitted = (IPOData) => {
        setIPO(IPOData)
        console.log(IPO)
    }

    const onClickReset = async() => {
        const data = {sessionID:sessionStorage.getItem('sessionID')}
        await axios.post(URL+'/routes/dataMgt/deleteRows',data).then((res)=> {
            setIPO(res.data.ipo)
            sessionStorage.removeItem('sessionID')
        }).catch(function (error) {
            errorIPSetting(error)
        })
    }

    const errorIPSetting =(error) => {
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

    const createSessionID = async() => {
        const uuidv4 = require('uuid/v4');
        newSessionID = uuidv4()
        sessionStorage.setItem('sessionID',newSessionID)
        const data= {sessionID:newSessionID}
        await axios.post(URL+'/routes/dataMgt/createSessionID',data).then((res) => {
                setSesID(res.data.id);
        }).catch(function (error) {
            errorIPSetting(error)
        })
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
                <BootstrapWhiteButton
                    variant="outlined"
                    color="primary"
                    onClick={createSessionID}
                >
                    Generate Session ID
                </BootstrapWhiteButton>
                    &nbsp;&nbsp;
                    <CopyToClipboard text={sesID} onCopy={copySessionID}>
                <BootstrapWhiteButton
                    color="secondary"
                >
                    Copy Session ID
                </BootstrapWhiteButton>
                    </CopyToClipboard>
                    &nbsp;&nbsp;
                    {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                    <p>*Please click the copy button to copy the ID to clipboard</p>
                </div>
            </div>

        )
}
export default ProbElement
