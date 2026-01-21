import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Slices/ExpensesSlice";
import userReducer from "./Slices/UserSlice";
import fieldReducer from "./Slices/FieldSlice";
import requestReducer from "./Slices/requestSlice";
const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    user: userReducer,
    field: fieldReducer,
    request: requestReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
