import axios from 'axios';

export const fetchDataSuccess = (data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data
  }
};

export const fetchDataFailure = (error) => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: error
  }
};

export const fetchDataLoading = (isLoading: boolean) => {
  return {
    type: 'FETCH_DATA_LOADING',
    payload: isLoading
  }
};

export const fetchMovies = (searchText: string) => {
  return (dispatch: (arg0: { type: string; payload: any }) => void) => {
    if(searchText.length>0)
    {
      dispatch(fetchDataLoading(true))
      dispatch(fetchDataSuccess([]))

      axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1&api_key=10e695fc7a5ee050b684f6bad670a6bb`)
      .then((response) => {
        dispatch(fetchDataSuccess(response.data.results))
        dispatch(fetchDataLoading(false))
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message))
        dispatch(fetchDataLoading(false))
      })
    }
    else{
      dispatch(fetchDataSuccess([]))
    }
  }
};
