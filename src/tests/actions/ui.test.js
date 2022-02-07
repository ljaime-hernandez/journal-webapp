import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";



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