const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  info: {
    email: '',
    name: '',
    avatar: '',
  },
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    show: (state, action) => {
      state.show = action.payload;
    },
    signIn: (state, action) => {
      state.info = {...action.payload};
    },
    signOut: (state, action) => {
      state.info = {
        email: '',
        name: '',
        avatar: '',
      };
    },
  },
});

module.exports = authSlice;
