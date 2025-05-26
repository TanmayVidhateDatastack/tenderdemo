"use client";
import styles from "./loginPage.module.css";
import Image from "next/image";
import datastakPng from "@/Common/TenderIcons/datastack.svg";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import { useState } from "react";
import DsPasswordField from "@/Elements/DsComponents/DsInputs/dsPasswordField";
function LoginPage({ handleSubmit }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className={styles.container}>
            <div className={styles.leftcolumn}>
                <div className={styles.leftContent}>
                    <div className={styles.logo}></div>
                    {/* <Image src={ipca} alt="logo" className={styles.logo} /> */}
                    <div className={styles.labelforaiPharma}>
                        <span className={styles.ai}>ai</span>
                        <span className={styles.pharma}>Pharma</span>
                    </div>
                    <label htmlFor="Pharma" className={styles.PharmaReinvented}>
                        Pharma Reinvented: Excellence Through AI-Integrated Operation
                    </label>
                </div>
                <div className={styles.bottomdiv}>
                    <label htmlFor="Version: 1.0">Version: 1.0</label>
                    <label htmlFor="Released On: 24/09/2024">
                        Released On: 24/09/2024
                    </label>
                </div>
            </div>
            <div className={styles.rightcolumn}>
                <div className={styles.rightContent}>
                    <label htmlFor="login" className={styles.labelforlogin}>
                        Login
                    </label>
                    <label htmlFor="Usernmar and password" className={styles.label}>
                        Enter your username and password
                    </label>
                    <div className={styles.mainDiv}>
                        <DsTextField
                            placeholder="Username"
                            initialValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></DsTextField>
                        <DsPasswordField
                            placeholder="Password"
                            initialValue={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(username, password);
                                }
                            }}
                        ></DsPasswordField>

                        <div className={styles.logindiv}>
                            <DsButton
                                id="loginBtn"
                                buttonColor="btnInfo"
                                buttonSize="btnMedium"
                                buttonViewStyle="btnContained"
                                className={btnStyles.btnAutoWidth}
                                label="Login"
                                onClick={() => {
                                    handleSubmit(username, password);
                                    // console.log("login clicked", password + username);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.cornerDiv}>
                    <label htmlFor="powered by" className={styles.poweredclass}>
                        Powered by:
                    </label>
                    <Image
                        src={datastakPng}
                        alt="datastack"
                        className={styles.datastacklogo}
                        width={50}
                        height={20}
                    />
                </div>
            </div>
        </div>
    );
}
export default LoginPage;

