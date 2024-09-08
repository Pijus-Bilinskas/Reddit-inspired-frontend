import React, { useEffect, useState } from "react";
import styles from "./RegisterModal.module.css";
import axios from "axios";


const RegisterFormModal = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isError, setError] = useState(false)
    const [isBadData, setBadData] = useState(false)
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        if (modal) {
            document.body.classList.add(`active_modal`)
        } else {
            document.body.classList.remove(`active_modal`)
        }
        return () => {
            document.body.classList.remove(`active_modal`)
        }
    }, [modal])

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
                `${process.env.SERVER_URL}/register`
            )
            if(response.status === 200){
                setBadData(false);
                toggleModal()
            }
        } catch(err){
            setBadData(true);
            console.log(err)
        }
    }

    return(
        <>
        <button onClick={toggleModal} className={styles.btn_modal} >
        Sign up
        </button>

        {modal && (
             <div className={styles.modal}>
             <div className={styles.overlay}>
                 <div className={styles.modal_content}>
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
             {isError && (
                 <div className={styles.modal_error}>Please fill all the fields</div>
             )}
             {isBadData && (
                 <div className={styles.modal_error}>Provided incorrect data</div>
             )}
             <button onClick={toggleModal} className={styles.close_modal}>Close</button>
                 </div>
             </div>
         </div>
        )}

        </>
    )
}

export default RegisterFormModal;