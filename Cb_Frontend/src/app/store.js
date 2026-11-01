import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/chatSlice"
import userReducer from "../features/auth/userAuthSlice"

export const store = configureStore({
  reducer:{
    chat:chatReducer,
    user: userReducer
  }
})