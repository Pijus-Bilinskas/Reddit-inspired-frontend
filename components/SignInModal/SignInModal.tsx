import React, {useState} from "react";
import styles from "./SignInModal.module.css";
import axios from "axios";
import Cookies from "js-cookie";

type LoginFormModalProps = {
    showModal: boolean;
    closeModal: () => void;
}

const LoginFormModal = ({showModal, closeModal}: LoginFormModalProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setError] = useState(false)
    const [isBadData, setBadData] = useState(false)

    const onLogin = async () => {
        const loginBody = {
            email: email,
            password: password,
        }

        if(!email || !password) {
            setError(true)
            return;
        }
        setError(false)
        try{
            const response = await axios.post(
                `${process.env.SERVER_URL}/login`,loginBody
            )
            if(response.status === 200) {
                setBadData(false);
                Cookies.set("jwt_token", response.data.jwt_token)
                closeModal()
            }
        } catch (err) {
            setBadData(true);
            console.log(err)
        }
    };

    if(!showModal) return null

    return (
        <div className={styles.Login_modal_overlay}>
            <div className={styles.Login_modal_content}>
                <button className={styles.modal_close_button} onClick={closeModal}>
                    &times;
                </button>
                <h2>Login</h2>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={styles.modal_input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={styles.modal_input}
                />
                <button onClick={onLogin} className={styles.modal_submit_button}>
                    Login
                </button>
                {isError && (
                    <div className={styles.modal_error}>Please fill all the fields</div>
                )}
                {isBadData && (
                    <div className={styles.modal_error}>Provided incorrect data</div>
                )}
            </div>
        </div>
    );
}

export default LoginFormModal