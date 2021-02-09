import types from '../types'

const initialState =  {
    notes: [],
    active: null
}

const notesReducer =  ( state = initialState, action ) => {


    switch (action.type) {
      case types.notesActive:
        return {
          ...state,
          active: {
            ...action.payload,
          },
        };

      case types.notesUpdated:
        return {
          ...state,
          notes: state.notes.map(note =>
            action.payload.id === note.id
              ? { ...action.payload.note, id: note.id }
              : note
          ),
        };

      case types.notesLoad:
        return {
          ...state,
          notes: [...action.payload],
        };

      case types.notesDelete:
        return {
          ...state,
          active: null,
          notes: state.notes.filter(note => note.id !== action.payload),
        };
    
        case types.notesLogoutCleanUp:
            return  {
                ...state,
                ...initialState
            }

      default:
        return state;
    }

}

export default notesReducer