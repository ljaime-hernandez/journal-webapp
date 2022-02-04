import { types } from "../../types/types";

describe('Tests on Types file', () => {

    test('should return information correctly', () => {
    
        expect(types).toEqual({
            login: '[auth] Login',
            logout: '[auth] Logout',
        
            uiSetError: '[UI] set error',
            uiRemoveError: '[UI] remove error',
        
            uiStartLoading: '[UI] start login',
            uiFinishLoading: '[UI] finish loading',
        
            notesAddNew: '[NOTES] new note',
            notesActive: '[NOTES] set active note',
            notesLoad: '[NOTES] Load notes',
            notesUpdate: '[NOTES] update note',
            notesFileUrl: '[NOTES] update image url',
            notesDelete: '[NOTES] delete note',
            notesLogoutClean: '[NOTES] logout notes cleaning'
        });
    });
});