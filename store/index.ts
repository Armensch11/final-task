import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../src/reducers/authSlice";

import { searchReducer } from "../src/reducers/searchSlice";
import proteinReducer from "../src/reducers/proteinSlice";

const rootReducer = combineReducers({
  authState: authReducer,
  searchState: searchReducer,
  proteinState: proteinReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
