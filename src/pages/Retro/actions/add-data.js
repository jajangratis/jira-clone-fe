import { initRequest } from '../../../global/actions'
import { retroActions } from '../../../store/retro'

// THUNK
export const retroAddData = (data) => {
    return async (dispatch) => {
        dispatch(retroActions.addData({
            type: 'RETRO_ADD_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/retro/add`, {
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
            dispatch(retroActions.addData({
                type: 'RETRO_ADD_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(retroActions.addData({
                type: 'RETRO_ADD_REDUCER_REJECTED'
            }))
        }
    }
}
