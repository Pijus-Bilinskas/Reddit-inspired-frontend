import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./AuthModal.module.css";

const AuthModal = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isError, setError] = useState(false);
    const [isBadData, setBadData] = useState(false)
    const [modal, setModal] = useState(false);
    const [isLoginModal, setIsLoginModal] = useState(true);

    const toggleModal = () => {
        setModal(!modal);
    }

    const switchModal = () => {
        setIsLoginModal(!isLoginModal);
        setError(false)
        setBadData(false)
        setEmail("")
        setPassword("")
        setName("")
    }

    useEffect(() => {
        if(modal) {
            document.body.classList.add("active_modal")
        } else {
            document.body.classList.remove("active_modal")
        }
        return () => {
            document.body.classList.remove("active_modal")
        }
    }, [modal])

    const onLogin = async () => {
        const loginBody = {
            email: email,
            password: password
        }
        if(!email || !password){
            setError(true)
            return
        }
        setError(false)
        try{
            const response = await axios.post(`${process.env.SERVER_URL}/login`,loginBody)
            if(response.status === 200) {
                setBadData(false)
                Cookies.set("jwt_token", response.data.jwt_token)
                Cookies.set("joined_groups", response.data.joined_groups)
                toggleModal()
            }
        } catch (err) {
            setBadData(true);
            console.log(err)
        }
    }

    const onRegister = async () => {
        const registerBody = {
            name: name,
            email: email,
            password: password
        }
        if(!name || !email || !password) {
            setError(true)
            return
        }
        setError(false)
        try{
            const response = await axios.post(
                `${process.env.SERVER_URL}/register`)
            if( response.status === 200) {
                setBadData(false)
                toggleModal()
            }
        } catch (err) {
            setBadData(true)
            console.log(err)
        }
    }

    return (
        <>
        <button onClick={toggleModal} className={styles.btn_modal}>
            {isLoginModal ? "Sign up" : "Log In"}
        </button>

        {modal && (
            <div className={styles.modal}>
                <div className={styles.overlay}>
                    <div className={styles.modal_content}>
                        <button onClick={toggleModal} className={styles.modal_close_btn}> X</button>
                        {isLoginModal ? (
                            <>
                            <h2>Log in</h2>
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
                            <button onClick={onLogin} className={styles.modal_submit_button}>Log in</button>
                            {isError && <div className={styles.modal_error}>Please fill all the fields</div>}
                            {isBadData && <div className={styles.modal_error}>Incorrect login data</div>}
                            <p>Dont have an account? <span onClick={switchModal} className={styles.switch_modal_link}>Sign up</span></p>
                            </>
                        ) : (
                            <>
                            <h2>Register</h2>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Username"
                                className={styles.modal_input}
                            />
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
                            <button onClick={onRegister} className={styles.modal_submit_button}>
                                Register
                            </button>
                            {isError && <div className={styles.modal_error}>Please fill all the fields</div>}
                            {isBadData && <div className={styles.modal_error}>Incorrect registration data</div>}
                            <p>Already have an account? <span onClick={switchModal} className={styles.switch_modal_link}>Log in here</span></p>
                                </>
                        )}
                    </div>
                </div>
            </div>
        )}
        </>
    )

}

export default AuthModal;