import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FirebaseService from 'app/services/firebaseService';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

export const getUserData = createAsyncThunk('chatApp/user/getUserData', async (_, { getState }) => {
  // const response = await axios.get('/api/chat/user');
  // const data = await response.data;
  debugger
  const user = await getState().auth.user;
  // const data = await user;

  const userData = await {
    id: user.id,
    name: user.data.name,
    avatar: user.data.avatar,
    status: user.status,
    mood: user.mood,
    chatList: [user.chatList]
  };

  return userData;
});

export const updateUserData = createAsyncThunk('chatApp/user/updateUserData', async (newData, { dispatch, getState }) => {
  debugger
  // const response = await axios.post('/api/chat/user/data', newData);
  // const data = await response.data;

  const user = await getState().auth.user;

  // user = _.merge({}, user, newData);

  var adaNameRef = await FirebaseService.db.ref(`users/${user.uid}`)
  adaNameRef.update(newData);
  dispatch(showMessage(
    {
      message: `user data saved to firebase`,
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'success'
    }
  ))

  return newData;
});

const userSlice = createSlice({
  name: 'chatApp/user',
  initialState: null,
  reducers: {
    updateUserChatList: (state, action) => {
      state.chatList = action.payload;
    },
  },
  extraReducers: {
    [getUserData.fulfilled]: (state, action) => action.payload,
    [updateUserData.fulfilled]: (state, action) => action.payload,
  },
});

export const { updateUserChatList } = userSlice.actions;

export default userSlice.reducer;
