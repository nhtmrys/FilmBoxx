import { configureStore } from "@reduxjs/toolkit";
import { pageSlice } from "./app/stores/page";
export default configureStore({
  reducer: {
    page: pageSlice.reducer,
  },
});
