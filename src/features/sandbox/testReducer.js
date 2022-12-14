import { asyncActionError, asyncActionFinish, asyncActionStart } from "../../async/asyncReducer";
import { delay } from '../../common/util/util';
import { toast } from 'react-toastify';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment(amount) {
    return async function(dispatch) {
        try {
            dispatch(asyncActionStart())
            await delay(2000);
            dispatch({ type: INCREMENT_COUNTER, payload:amount});
            dispatch(asyncActionFinish());
        } catch(error) {
            dispatch(asyncActionError(error));
            toast.error(error);
        }
       
    }
}


export function decrement(amount) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

const initialState = {
    data: 42

}

export default function testReducer(state = initialState, action) {
    switch(action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state

    }
}