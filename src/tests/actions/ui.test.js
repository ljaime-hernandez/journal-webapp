import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
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
9. to have a clearer view of this single js test file, press p. then type the file name 'ui.test.js'
*/

describe('tests on ui actions', () => {

    test('all actions should work', () => {
      
        const action = setError('ERRROOORRR');

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'ERRROOORRR'
        })

        const removeErroraction = removeError();
        const startLoadingaction = startLoading();
        const finishLoadingaction = finishLoading();

        expect(removeErroraction).toEqual({
            type: types.uiRemoveError
        });
        expect(startLoadingaction).toEqual({
            type: types.uiStartLoading
        });
        expect(finishLoadingaction).toEqual({
            type: types.uiFinishLoading
        });
    });
})