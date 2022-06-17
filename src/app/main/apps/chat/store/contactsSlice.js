import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getContacts = createAsyncThunk('chatApp/contacts/getContacts', async (_, { getState }) => {
  debugger
  const user = await getState().auth.users;
  // const data = await user;

  // const response = await axios.get('/api/chat/contacts', { params });
  // const data = await response.data;
  const contactData = [];

  await user.map(item => {
    return contactData.push({
      id: item.id,
      name: item.data.name,
      avatar: item.data.avatar,
      status: item.status,
      mood: item.mood,
      unread: item.unread
    })
  })

  return contactData;

});


const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactById } =
  contactsAdapter.getSelectors((state) => state.chatApp.contacts);

const contactsSlice = createSlice({
  name: 'chatApp/contacts',
  initialState: contactsAdapter.getInitialState({
    selectedContactId: null,
  }),
  reducers: {
    setSelectedContactId: (state, action) => {
      state.selectedContactId = action.payload;
    },
    removeSelectedContactId: (state, action) => {
      state.selectedContactId = null;
    },
  },
  extraReducers: {
    [getContacts.fulfilled]: contactsAdapter.setAll,
  },
});

export const { setSelectedContactId, removeSelectedContactId } = contactsSlice.actions;

export default contactsSlice.reducer;
