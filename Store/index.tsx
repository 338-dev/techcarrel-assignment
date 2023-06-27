import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import movieReducer from './reducers'

const rootReducer = combineReducers({
  moviesData: movieReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export default store;
