import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  conversationId: localStorage.getItem("conversationId") || null,
  messages: [],
  conversations: []
};
const chatSlice = createSlice({
  name:"chat",
  initialState,
  reducers:{
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    clearCurrentChat: (state) => {
      state.messages = [];
    },
    addMessage:(state,action)=>{
      state.messages.push(action.payload)
    },
    setMessages: (state, action) => { state.messages = action.payload; },
  }
})
export const {addMessage,setMessages,setConversationId,
  clearCurrentChat,setConversations} = chatSlice.actions;
export default chatSlice.reducer;