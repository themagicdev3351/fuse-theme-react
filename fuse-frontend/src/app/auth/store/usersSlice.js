/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const users = (users) => async (dispatch, getState) => {
    try {
        await dispatch(setUsers(users));
    }
    catch (e) {
        return console.error(e.message);
    }
};
// export const users = createAsyncThunk(
//     'auth/users',
//     async ({ users }, { dispatch, getState }) => {

//         dispatch(setUsers(users));

//         return users;
//     }
// );


const initialState = {
    role: [],
    data: {
        displayName: 'John Doe',
        photoURL: 'assets/images/avatars/Velazquez.jpg',
        email: 'johndoe@withinpixels.com',
        shortcuts: ['calendar', 'mail', 'contacts', 'todo']
    },
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => action.payload,
        actions: { type: "todos/addTodo" },
    }
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
