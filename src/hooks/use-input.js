import {  useReducer } from "react"

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT':
            return {value : action.value, isTouched: state.isTouched}
        case 'BLUR':
            return { isTouched: true, value: state.value }
        case 'RESET':
            return initialInputState
    
        default:
            break;
    }
    return initialInputState
}

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

    const valueIsValid = validateValue(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        dispatch({type: 'INPUT', value: event.target.value})
    }

    const valueBlurHandler = event => {
        dispatch({type: 'BLUR'})
    }

    const resetData = () => {
        dispatch({type: 'RESET'})
    }

    return {
        value: inputState.value,
        hasError,
        isValid: valueIsValid,
        valueChangeHandler,
        valueBlurHandler,
        reset: resetData,
    }
}

export default useInput