/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';



export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
  if (
    user &&
    user.data &&
    user.data.settings &&
    user.data.settings.theme &&
    user.data.settings.layout &&
    user.data.settings.layout.style
  ) {
    // Set user data but do not update
    return dispatch(setUserData(user));
  }

  // Create missing user settings
  return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = (authUser) => async (dispatch, getState) => {
  const guestUser = getState().auth.user;
  const fuseDefaultSettings = getState().fuse.settings.defaults;
  const { currentUser } = firebase.auth();

  /**
   * Merge with current Settings
   */
  const user = _.merge({}, guestUser, {
    uid: authUser.uid,
    id: authUser.uid,
    from: 'firebase',
    role: ['admin'],
    data: {
      displayName: authUser.displayName,
      email: authUser.email,
      photoURL: 'assets/images/avatars/Velazquez.jpg',
      avatar: 'assets/images/avatars/Velazquez.jpg',
      name: authUser.displayName,
      settings: { ...fuseDefaultSettings },
    },
    status: 'online',
    mood: "it's a status....not your diary...",
    chatList: [
      {
        chatId: '1725a680b3249760ea21de52',
        contactId: '5725a680b3249760ea21de52',
        lastMessageTime: '2021-06-12T02:10:18.931Z'
      },
      {
        chatId: '2725a680b8d240c011dd2243',
        contactId: '5725a680606588342058356d',
        lastMessageTime: '2021-02-18T10:30:18.931Z'
      },
      {
        chatId: '3725a6809413bf8a0a5272b4',
        contactId: '5725a68009e20d0a9e9acf2a',
        lastMessageTime: '2021-03-18T12:30:18.931Z'
      }
    ],
    chats: [
      {
        id: '1725a680b3249760ea21de52',
        dialog: [
          {
            who: '5725a680b3249760ea21de52',
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            time: '2021-03-22T08:54:28.299Z'
          },
          {
            who: '5725a6802d10e277a0f35724',
            message: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
            time: '2021-03-22T08:55:28.299Z'
          },
          {
            who: '5725a6802d10e277a0f35724',
            message: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
            time: '2021-03-22T08:56:28.299Z'
          }
        ]
      },
      {
        id: '2725a680b8d240c011dd2243',
        dialog: [
          {
            who: '5725a680606588342058356d',
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            time: '2021-04-22T01:00:00.299Z'
          },
          {
            who: '5725a6802d10e277a0f35724',
            message: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
            time: '2021-04-22T01:05:00.299Z'
          },
          {
            who: '5725a680606588342058356d',
            message: 'We are losing money! Quick!',
            time: '2021-04-22T01:10:00.299Z'
          }
        ]
      },
      {
        id: '3725a6809413bf8a0a5272b4',
        dialog: [
          {
            who: '5725a68009e20d0a9e9acf2a',
            message: 'Quickly come to the meeting room 1B, we have a big server issue',
            time: '2021-04-22T02:10:00.299Z'
          }
        ]
      }
    ],
  });
  currentUser.updateProfile(user.data);

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
  /*
        You can redirect the logged-in user to a specific route depending on his role
         */

  history.location.state = {
    // redirectUrl: user.redirectUrl, // for example 'apps/academy'
    redirectUrl: 'pages/profile'
  };

  /*
    Set User Settings
     */
  dispatch(setDefaultSettings(user.data.settings));

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const updateUserShortcuts = (shortcuts) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const newUser = {
    ...user,
    data: {
      ...user.data,
      shortcuts,
    },
  };

  dispatch(updateUserData(user));

  return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  switch (user.from) {
    case 'firebase': {
      firebaseService.signOut();
      break;
    }
  }

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }
  switch (user.from) {
    case 'firebase': {
      firebaseService
        .updateUserData(user)
        .then(() => {
          dispatch(showMessage({ message: 'User data saved to firebase' }));
        })
        .catch((error) => {
          dispatch(showMessage({ message: error.message }));
        });
      break;
    }
  }
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo']
  },
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
