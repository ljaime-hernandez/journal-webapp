import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

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