import { makeStyles } from '@mui/styles';

export default makeStyles({
    wrapperForm: {
        width: '100%',
    },
    btnStyle: {
        width: '100% !important',
        boxShadow: 'none !important',
        color: 'white !important',
        background: '#222E61 !important',
        textTransform: 'capitalize !important',
        '&:hover': {
            background: '#222e61db !important',
        },
        '&:disabled': {
            background: '#ddd !important',
        },
    },
    wrapperForgetPassword: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '10px',
    },
    textForgotPassword: {
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '17px',
        textAlign: 'center',
        letterSpacing: '0.5px',
        // textDecoration: 'none',
        color: '#3464A5',
    },
    textTitleTerm: {
        fontFamily: 'Barlow',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '22px',
        textAlign: 'center',
        letterSpacing: '0.5px',
        color: '#222E61',
        display: 'block',
    },
    textDateTerm: {
        fontFamily: 'Source Sans Pro',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        textAlign: 'center',
        letterSpacing: '0.5px',
        display: 'block',
        color: '#333333',
        marginTop: 5,
    },
    dialogTerm: {
        padding: '42px 23px !important',
        borderRadius: '45px !important',
        boxSizing: 'border-box',
    },
    contentTerm: {
        paddingLeft: '25px',
        paddingTop: '25px',
        marginTop: '5px',
        marginBottom: '30px',
    },
    wrapButtonDialog: {
        width: '50%',
        margin: 'auto',
    },
    textError: {
        color: '#ca302d',
        textAlign: 'center',
        fontSize: '0.8rem',
        display: 'block',
        marginTop: 10,
    },
    textPrivacy: {
        fontSize: '14px',
        color: '#222E61',
        '& a': {
            fontWeight: 500,
            color: '#222E61',
        },
    },
    resendText: {
        color: '#222E61',
    },
    wrapperCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underlineStyle: {
        border: 0,
    },
});