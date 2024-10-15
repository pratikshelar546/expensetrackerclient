import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Slices/ExpensesSlice";
import userReducer from "./Slices/UserSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    user: userReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
