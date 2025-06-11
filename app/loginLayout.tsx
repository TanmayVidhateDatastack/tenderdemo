"use client";

import DsElLayout from "@/Elements/ERPComponents/DsElLayout/DsElLayout";
import store from "@/Redux/store/store";
import { Provider } from "react-redux";
const defaultUser = {
  userId: 0,
  firstName: "Rajat",
  lastName: "Sharma",
  employeeId: "1000212",
  email: "rajat.sharma@ipca.com",
  company: {
    id: "",
    name: "Ipca Labs",
    address: undefined,
  },
  division: {
    id: 0,
    name: "Formulation",
  },
  location: {
    id: 0,
    name: "104,Pune",
    address: {
      id: 0,
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      city: "Pune",
      state: "",
      pinCode: "104",
      isPrimary: "",
      phoneNumbers: undefined,
      telePhoneNumbers: undefined,
      email: undefined,
      code: undefined,
    },
  },
  role: [],
  department: {
    id: 0,
    code: "",
    name: "Formulation",
  },
};
const LoginLayout = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <DsElLayout user={defaultUser}>{children}</DsElLayout>
      </Provider>
    </>
  );
};

export default LoginLayout;
