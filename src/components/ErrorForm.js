import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


const ErrorForm = ({message, title='Error'}) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">
                <AlertTitle><Typography>{title}</Typography></AlertTitle>
                <Typography>{message}</Typography>
            </Alert>
        </Stack>
    )
}

export default ErrorForm