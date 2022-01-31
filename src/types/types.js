
// used for all custom reducers, the string will help us have a brief description of what the action does
// in the redux extension debugger
export const types = {
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
}
