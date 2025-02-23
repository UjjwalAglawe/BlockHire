import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("user/signup", async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const staticUserData = {
        id: 1,
        username: userData.username,
        email: userData.email,
        client: userData.client,
        metaMaskAccount: userData.metaMaskAccount,
        location: userData.location,
        aboutMe: userData.aboutMe,
        university: userData.university,
        languages: userData.languages,
        occupation: userData.occupation,
        skills: userData.skills,
        certificates: userData.certificates,
      };
      resolve(staticUserData);
    }, 1000)
  });
});

const initialState = {
  active: false,
  client: 'client',
  signup: {
    status: 'idle',
    error: null,
    userInfo: null,
  },
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    updateClient(state, action) {
      state.client = action.payload;
    },
    updateUserInfoField(state, action) {
      const { field, value } = action.payload;
      if (state.signup.userInfo[field]!==undefined) {
        state.signup.userInfo[field] = value;
      }
    },
    addItemToArray(state, action) {
      const { field, item } = action.payload;
      if (state.signup.userInfo && state.signup.userInfo[field]) {
        state.signup.userInfo[field].push(item);
      }
    },
    updateItemInArray(state, action) {
      const { field, index, value } = action.payload;
      if (state.signup.userInfo && state.signup.userInfo[field]) {
        state.signup.userInfo[field][index] = value;
      }
    },
    deleteItemFromArray(state, action) {
      const { field, index } = action.payload;
      if (state.signup.userInfo && state.signup.userInfo[field]) {
        state.signup.userInfo[field].splice(index, 1);
      }
    },
    resetSignupState(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.signup.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signup.status = 'succeeded';
        state.active = true;
        state.signup.userInfo = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signup.status = 'failed';
        state.signup.error = action.error.message;
      });
  },
})

export const { 
  updateClient,
  updateUserInfoField,
  addItemToArray,
  updateItemInArray,
  deleteItemFromArray,
  resetSignupState,
} = signupSlice.actions;
export default signupSlice.reducer;