import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../src/reducers/authSlice";

const rootReducer = combineReducers({
  authState: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
