import { initRequest } from '../../../global/actions'
import { retroActions } from '../../../store/retro'

// THUNK
export const retroEditData = (data) => {
    return async (dispatch) => {
        dispatch(retroActions.addData({
            type: 'RETRO_EDIT_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/retro/edit`, {
                method:'post',
                headers: {
                    authorization: ''
                },
                data
            }, true)
            console.log({response});
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
            dispatch(retroActions.getData({
                type: 'RETRO_EDIT_REDUCER_FULFILLED',
                data: data,
            }))
        } catch (error) {
            console.log({error});
            dispatch(retroActions.getData({
                type: 'RETRO_EDIT_REDUCER_REJECTED'
            }))
        }
    }
}
