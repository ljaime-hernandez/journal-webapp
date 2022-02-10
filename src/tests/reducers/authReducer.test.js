import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install redux-mock-store --save-dev' command (if you have not done so)
7. make sure the setupTests.js file include the enzyme, enzyme-to-json and the react adapter libraries
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'authReducer.test.js'
*/



describe('tests on authReducer', () => {

    test('should return default', () => {
      
        const state = authReducer({}, {});
        expect(state).toEqual({});
    });

    test('should return uid and name', () => {
      
        const action = {
            type: types.login,
            payload: {
                uid: '12345ABCDE',
                displayName: 'Alice'
            }
        }

        const state = authReducer({}, action);
        expect(state).toEqual({uid: '12345ABCDE', name: 'Alice'});
    });

    test('should return empty state', () => {
        
        const initialState = {
            uid: '12345ABCDE',
            name: 'Alice'
        }

        const action = {
            type: types.logout
        }

        const state = authReducer(initialState, action);
        expect(state).toEqual({});
    });
})