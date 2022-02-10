import { makeStyles } from '@mui/styles';

export default makeStyles({
  wrapperGrid: {
    minHeight: '100vh',
    padding: '0 20px',
    background: '#222E61',
  },
  wrapperLogin: {
    flex: 1,
    borderRadius: 20,
    margin: '40px 0',
    padding: '20px 40px',
    // minHeight: '800px',
    // boxSizing: 'border-box',
  },
  imgResponsive: {
    width: '90%',
  },
  wrapperGridItem: {
    padding: '0 3%',
  },
  messageNotif: {
    padding: '15px 25px 15px',
    borderRadius: '9999999px',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '&.error': {
      background: '#FFE5E4',
    },
    '&.success': {
      background: '#C9F4DA',
    },
  },
  snackbar: {
    boxShadow: 'none',
    background: '#e53935',
    width: 'calc(100% - 32px)',
    marginRight: 0,
    marginLeft: 0,
  },
  wrapperChangeType: {
    background: '#EBEBEB',
    width: '292px',
    height: '40px',
    borderRadius: '99999px',
  },
  wrapperCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  fixed: {
    position: 'fixed',
    // background: 'red',
    top: '14vh',
    left: '8vw',
  },
  buttonChangeType: {
    background: '#FFFFFF',
    width: '50%',
    borderRadius: '99999px',
    height: '100%',
    color: '#222E61',
    borderColor: '#222E61',
    outline: 'none',
    transition: '.2s ease',
    '&:focus': {
      background: '#f8f8f8',
    },
    '&.deactive': {
      background: '#EBEBEB !important',
      border: 0,
    },
  },
});
