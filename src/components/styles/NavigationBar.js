import { makeStyles } from '@mui/styles';

export default makeStyles({
    wrapperNav: {
        backgroundColor: '#5C7AEA',
        height: '100vh',
    },

    menuBar: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5px',
        paddingBottom: '5px',
        '&:hover':{
            border: '1px solid'
        }
    },

    activeBar: {
        backgroundColor: '#9ba4d4',
        border: '1px solid'
    },

    iconNavigation: {
        color: 'white',
        fontSize: 40,
    }
})