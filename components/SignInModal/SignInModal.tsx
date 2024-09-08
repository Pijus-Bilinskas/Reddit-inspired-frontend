import React, {useState, useEffect} from "react";
import styles from "./SignInModal.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import RegisterFormModal from "../RegisterModal/RegisterModal";


const LoginFormModal = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setError] = useState(false)
    const [isBadData, setBadData] = useState(false)
    const [modal, setModal] = useState(false)

    
    const toggleModal = () => {
        setModal(!modal)
    };
    
    const handleOpenRegisterModal = () => {
        toggleModal()
    }    


    useEffect(() => {
        if (modal) {
          document.body.classList.add('active_modal');
        } else {
          document.body.classList.remove('active_modal');
        }
    
        // Cleanup the effect by removing the class when the component unmounts
        return () => {
          document.body.classList.remove('active_modal');
        };
      }, [modal]);

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
                toggleModal()
            }
        } catch (err) {
            setBadData(true);
            console.log(err)
        }
    };

    return(
        <>
        <button onClick={toggleModal} className={styles.btn_modal}>
            Login
        </button>

        {modal && (
            <div className={styles.modal}>
                <div className={styles.overlay}>
                    <div className={styles.modal_content}>
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
                <button onClick={toggleModal} className={styles.close_modal}>Close</button>
                <p>new to this?<span>
                    <RegisterFormModal/>
                    </span></p>
                    </div>
                </div>
            </div>
        )}
        </>
    )

}

export default LoginFormModal