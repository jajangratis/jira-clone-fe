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
        try {
            let response = await sendRequest()
            dispatch(retroActions.deleteData({
                type: 'RETRO_DATA_DELETE_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(retroActions.deleteData({
                type: 'RETRO_DATA_DELETE_REDUCER_REJECTED'
            }))
        }
    }
}
