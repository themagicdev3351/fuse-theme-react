import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setSelectedContactId } from './contactsSlice';
import { closeMobileChatsSidebar } from './sidebarsSlice';
import { updateUserChatList } from './userSlice';

export const getChat = createAsyncThunk(
  'chatApp/chat/getChat',
  async ({ contactId, isMobile }, { dispatch, getState }) => {
    debugger
    // const { uid: userId } = getState().auth.user;
    const { id: userId } = getState().auth.user;
    const users = getState().auth.users;

    // const response = await axios.get('/api/chat/get-chat', {
    //   params: {
    //     contactId,
    //     userId,
    //   },
    // });
    // const { chat, userChatList } = await response.data;

    const user = users.find(_user => _user.id === userId);

    const chatList = users.map((item, index) => {
      return item.chatList
    })

    const userChat = chatList.find(_chat => _chat.contactId === contactId);
    const chatId = userChat ? userChat.chatId : createNewChat(contactId, userId);



    dispatch(setSelectedContactId(contactId));
    dispatch(updateUserChatList(user.chatList));

    if (isMobile) {
      dispatch(closeMobileChatsSidebar());
    }

    return user.chats.find(_chat => _chat.id === chatId)

    // return chat;
  }
);

export const sendMessage = createAsyncThunk(
  'chatApp/chat/sendMessage',
  async ({ messageText, chatId, contactId }, { dispatch, getState }) => {
    const response = await axios.post('/api/chat/send-message', { chatId, messageText, contactId });

    const { message, userChatList } = await response.data;

    dispatch(updateUserChatList(userChatList));

    return message;
  }
);

const chatSlice = createSlice({
  name: 'chatApp/chat',
  initialState: null,
  reducers: {
    removeChat: (state, action) => action.payload,
  },
  extraReducers: {
    [getChat.fulfilled]: (state, action) => action.payload,
    [sendMessage.fulfilled]: (state, action) => {
      state.dialog = [...state.dialog, action.payload];
    },
  },
});

export default chatSlice.reducer;
