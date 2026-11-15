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
    clearConversationId: (state, action) => {
      state.conversationId = null;
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
    appendMessageChunk: (state, action) => {
      const message = state.messages.find(
        (item) => item._id === action.payload.id,
      );
      if (message) {
        message.contents += action.payload.text;
      }
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter((message) => message._id !== action.payload);
    },
    setMessages: (state, action) => { state.messages = action.payload; },
  }
})
export const {addMessage,setMessages,setConversationId,
  clearCurrentChat,setConversations,clearConversationId,removeMessage,appendMessageChunk} = chatSlice.actions;
export default chatSlice.reducer;