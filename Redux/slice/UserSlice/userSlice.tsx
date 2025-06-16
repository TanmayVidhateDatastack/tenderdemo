import { User } from "@/Common/helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = {
  roleId: string;
  roleName: string;
};

export type UserState = {
  userRoles: UserRole[]; // Array to store roles
  role: string; // Single role or other status (depending on your use case)
  // user: User; // User object containing user details
};

export const ContractStatuses = {
  AWARDED: "ContractStatuses",
  PARTIALLY_AWARDED: "Partially Awarded",
  LOST: "Lost",
  CANCELLED: "Cancellation",
};

const initialState: UserState = {
  userRoles: [], // Initialize with an empty array
  role: "", // Initialize with an empty string
  // user: {
  //   userId: 0,
  //   firstName: "",
  //   lastName: "",
  //   employeeId: "",
  //   email: "",
  //   company: {
  //     id: 0,
  //     name: "",
  //     address: {
  //       id: 0,
  //       address1: "",
  //       address2: "",
  //       address3: "",
  //       address4: "",
  //       city: "",
  //       state: "",
  //       pinCode: "",
  //       isPrimary: "",
  //     },
  //   },
  //   division: {
  //     id: 0,
  //     name: "",
  //   },
  //   location: {
  //     id: 0,
  //     name: "",
  //     address: {
  //       id: 0,
  //       address1: "",
  //       address2: "",
  //       address3: "",
  //       address4: "",
  //       city: "",
  //       state: "",
  //       pinCode: "",
  //       isPrimary: "",
  //     },
  //   },
  //   role: [
  //     {
  //       id: 0,
  //       name: "",
  //     },
  //   ],
  // },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRoles: (state, action: PayloadAction<UserRole[]>) => {
      state.userRoles = action.payload; // Set the payload as the userRoles array
      return state;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload; // Update roles to the new string value
      return state;
    },
    // setUser: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload; // Update roles to the new string value
    //   return state;
    // },
  },
});

export const { setUserRoles, setUserRole } = userSlice.actions;
export default userSlice.reducer;
