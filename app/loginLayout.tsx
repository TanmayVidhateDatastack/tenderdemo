"use client";

import DsElLayout from "@/Elements/ERPComponents/DsElLayout/DsElLayout";
import store from "@/Redux/store/store";
import { Provider } from "react-redux";

const LoginLayout = ({ children }) => {
    return (
        <>
            <Provider store={store}>
                <DsElLayout>{children}</DsElLayout>
            </Provider>
        </>
    );
};

export default LoginLayout;

