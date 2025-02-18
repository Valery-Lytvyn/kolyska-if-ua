import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  available: string;
}

const initialState: UserState = {
  id: "",
  available: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.available = action.payload.available;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
