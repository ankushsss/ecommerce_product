import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




var teamInitialState = {
  email:'',
  password:''
  };


  const userLoginReducer = createSlice({
    name: "user",
    initialState: teamInitialState,
    reducers: {
        loginUserData:(state,action)=> {
                state = action.payload
                return action.payload
          }
    },
  });


export const { loginUserData } = userLoginReducer.actions
export default userLoginReducer.reducer

