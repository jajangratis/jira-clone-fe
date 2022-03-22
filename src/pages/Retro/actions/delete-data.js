import { initRequest } from '../../../global/actions'
import { retroActions } from '../../../store/retro'

// THUNK
export const retroDeleteData = (data) => {
    return async (dispatch) => {
        dispatch(retroActions.deleteData({
            type: 'RETRO_DATA_DELETE_REDUCER_PENDING',
        }))
        const sendRequest = async () => {
            const response = await initRequest(`/retro/delete`, {
                method:'post',
                headers: {
                    authorization: ''
                },
                data
            }, true)
            return response
        }
        const getData = async () => {
            const response = await initRequest(`/retro/data?c_sprint_id=`+data.c_sprint_id, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            let data = await getData()
            dispatch(retroActions.deleteData({
                type: 'RETRO_DATA_DELETE_REDUCER_FULFILLED',
                data: data,
            }))
        } catch (error) {
            console.log({error});
            dispatch(retroActions.deleteData({
                type: 'RETRO_DATA_DELETE_REDUCER_REJECTED'
            }))
        }
    }
}
