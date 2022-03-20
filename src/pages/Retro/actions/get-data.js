import { initRequest } from '../../../global/actions'
import { retroActions } from '../../../store/retro'

// THUNK
export const retroGetData = (data) => {
    return async (dispatch) => {
        dispatch(retroActions.getData({
            type: 'RETRO_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/retro/data?c_sprint_id=`+data, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(retroActions.getData({
                type: 'RETRO_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(retroActions.getData({
                type: 'RETRO_DATA_REDUCER_REJECTED'
            }))
        }
    }
}
