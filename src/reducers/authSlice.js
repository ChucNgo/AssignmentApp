const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  info: {
    email: '',
    external_key: '',
    givenName: '',
    family_name: '',
    name: '',
  },
  show: true,
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
        external_key: '',
        givenName: '',
        family_name: '',
        name: '',
      };
    },
  },
});

module.exports = authSlice;
