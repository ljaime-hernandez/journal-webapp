import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

describe('tests on uiReducer', () => {

    const initialState = {
        loading: false,
        msgError: null
    }

    test('should return default state', () => {
      
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    });


    test('should set an error', () => {
      
        const action = {
            type: types.uiSetError,
            state: initialState,
            payload: 'Error Message'
        }

        const state = uiReducer(initialState, action);
        expect(state.msgError).toEqual('Error Message');
    });

    test('should unset an error', () => {
      
        const action = {
            type: types.uiRemoveError,
            state: initialState,
            payload: 'Error Message'
        }

        const state = uiReducer(initialState, action);
        expect(state.msgError).toBe(null);

    });

    test('should start loading', () => {
      
        const action = {
            type: types.uiStartLoading,
            state: initialState,
            payload: 'Error Message'
        }

        const state = uiReducer(initialState, action);
        expect(state.loading).toBeTruthy();
    });

    test('should finish loading', () => {
      

        const action = {
            type: types.uiFinishLoading,
            state: initialState,
            payload: 'Error Message'
        }

        const state = uiReducer(initialState, action);
        expect(state.loading).toBe(false);
    });
})