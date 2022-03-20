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
            console.log({response});
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(retroActions.getData({
                type: 'RETRO_ADD_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(retroActions.getData({
                type: 'RETRO_ADD_REDUCER_REJECTED'
            }))
        }
    }
}
