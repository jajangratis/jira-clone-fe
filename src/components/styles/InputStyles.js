import { makeStyles } from '@mui/styles';

export default makeStyles({
    wrapperInput: {
        padding: '12px 15px',
        border: '1px solid #8D8D8D',
        borderRadius: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        '&.error': {
            borderColor: '#C33735',
        },
    },
    wrapperSelected: {
        padding: '10px 15px',
        border: '1px solid #8D8D8D',
        borderRadius: '10px',
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        '&.error': {
            borderColor: '#C33735',
        },
    },
    textLable: {
        color: '#222E61',
        flex: 1,
        fontWeight: 'bold',
        fontSize: '0.8em',
    },
    inputWrapper: {
        flex: 2,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    prefix: {
        fontSize: '0.85em',
        color: 'black',
        paddingBottom: '2px',
        marginRight: '5px',
    },
    input: {
        width: '0%',
        padding: 0,
        marginTop: 0,
        border: 0,
        display: 'block',
        fontSize: '0.8em',
        flex: 1,
        '&:focus': {
            outline: 0,
        },
        '&::placeholder': {
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '0.8em',
            color: '#aaa',
        },
    },
    toggelButtonPassword: {
        lineHeight: '10px',
        '&:hover': {
            background: 'white !important',
        },
    },
    textError: {
        color: '#C33735',
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: '10px',
        marginLeft: '20px',
        position: 'absolute',
        paddingTop: '2px',
    },
    selectMenu: {
        padding: 0,
        background: 'white !important',
        fontSize: '0.8em',
    },
    listInput: {
        '& .MuiInput-underline': {
            '&:before': {
                border: '0px !important',
            },
            '&:after': {
                border: '0px !important',
            },
        },
    },
});