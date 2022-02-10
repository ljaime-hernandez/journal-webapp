import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'uiReducer.test.js'
*/

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