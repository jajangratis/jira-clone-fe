import { Box, Grid, Typography, Paper, TextField, IconButton, CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { retroGetData } from '../actions/get-data'
import { retroAddData } from '../actions/add-data'
import { DeleteIconWrap, ModeEditIconWrap } from "../../../components/Icons";
import DialogStateless from "../../../components/Dialog2";
import { retroDeleteData } from "../actions/delete-data";




const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RetroContent = () => {
    const {c_sprint_id} = useParams()
    const masterState = useSelector(state => state.master)
    const {data, user} = masterState.result
    const retroStatus = data.filter(x => x.v_master === 'retrostatus')
    const dispatch = useDispatch()
    
    const retroState = useSelector(state => state.retro)
    const [dataState, setDataState] = useState()
    const [retroData, setRetroData] = useState()
    const [dataWillDelete, setDataWillDelete] = useState()
    const [openDialogDelete, setOpenDialogDelete] = useState(false)

    useEffect(() => {
        dispatch(retroGetData(c_sprint_id))
    }, [c_sprint_id, dispatch])
    
    useEffect(() => {
        setRetroData(retroState.result)
    },[retroState.result])



    const handleCloseDialogDelete = () => {
        setOpenDialogDelete(false)
    }
    return (
        <Box sx={{overflowX: 'scroll', maxHeight:'85vh',}}>
            {/* delete dialog */}
            <DialogStateless
                wording={"Data yang akan dihapus tidak bisa dikembalikan"}
                onClickAction={() => {
                    dispatch(retroDeleteData(dataWillDelete))
                    dispatch(retroGetData(c_sprint_id))
                }}
                title={"Delete Retro?"}
                isOpen={openDialogDelete}
                handleClose={handleCloseDialogDelete}
            ></DialogStateless>
            <Grid container>
                {retroState.isLoading ? 
                    <Box><CircularProgress/></Box>
                :
                    retroStatus.sort((a,b) => a.v_order - b.v_order).map(x => {
                        return (
                            <Grid items xs={3} sx={{p: '5px', my: '5px'}}>
                                <Item>
                                    <Typography>{x.v_value}</Typography>
                                </Item>
                                <TextField margin="normal" fullWidth='true' value={dataState}  placeholder={`Write about ${x.c_value_id}`} inputProps={'ariaLabel'} onKeyPress={(event) => {
                                    if(event.key === 'Enter'){
                                        if (event.target.value !== undefined) {
                                            const data = {
                                                v_value: event.target.value,
                                                c_retro_status: x.c_value_id,
                                                c_sprint_id,
                                            }
                                            setDataState()
                                            dispatch(retroAddData(data))
                                            dispatch(retroGetData(c_sprint_id))
                                            alert('added')
                                        }
                                    }
                                }}/>
                                <Grid container direction="column">
                                    {(retroState.result?.filter(y => y.c_retro_status === x.c_value_id).map(z => {
                                        return (
                                            <Grid items sx={{ my: '5px'}}>
                                                <Item>
                                                    <Box>
                                                        <Typography>{z.v_value}</Typography>
                                                    </Box>
                                                    <Box sx={{p: '5px', mt: '15px', mx: '0px'}}>
                                                        <Grid container>
                                                            <Grid items xs={6} sx={{textAlign: 'left', mt:'10px', mx: '0px'}}>
                                                                <IconButton ><ModeEditIconWrap sx={{fontSize: '15px', '&:hover': {color: 'primary.main', fontSize: '18px'}}}/></IconButton>
                                                                <IconButton onClick={() => {
                                                                    setDataWillDelete(z)
                                                                    setOpenDialogDelete(true)
                                                                }}><DeleteIconWrap sx={{fontSize: '15px', '&:hover': {color: 'error.main', fontSize: '18px'}}}/></IconButton>
                                                                
                                                            </Grid>
                                                            <Grid items xs={6} sx={{textAlign: 'right', mt:'15px'}}>
                                                                <Typography>{user.filter(x => x.c_user_id === z.c_user_id)[0]?.v_fullname}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Item>
                                            </Grid>
                                        )
                                    }))}
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default RetroContent