export const initialState = {
  data: [],
  error: null,
  isLoading: false
};

const movieReducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
        isLoading: false
      }
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        data: [],
        error: action.payload,
        isLoading: false
      }
      case 'FETCH_DATA_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        }  
    default:
      return state
  }
};

export default movieReducer;
