import {Box} from '@mui/material'

const BoxOverflowY = (props) => {

    return <Box sx={{
        overflowX: 'scroll',
        maxHeight:props.maxHeight?props.maxHeight:'100vh',
        ...props.sx
    }}>{props.children}</Box>
}

export default BoxOverflowY