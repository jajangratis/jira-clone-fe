import { Box, Grid, Typography, Paper } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RetroContent = () => {
    const masterState = useSelector(state => state.master)
    const {data} = masterState.result
    const retroStatus = data.filter(x => x.v_master === 'retrostatus')
    return (
        <Box>
            <Grid container>
                {retroStatus.map(x => {
                    return (
                        <Grid items xs={3} sx={{p: '5px', my: '5px'}}>
                            <Item>
                                <Typography>{x.v_value}</Typography>
                            </Item>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default RetroContent