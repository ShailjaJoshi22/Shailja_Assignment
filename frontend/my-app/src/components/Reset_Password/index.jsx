import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { authLogin } from "../../services/login";
const apiUrl = process.env.REACT_APP_API_URL;

const Reset_Password = () => {
    const [data, setData] = useState({ password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const history = useNavigate();
    const { id, token } = useParams();

    console.log("reset password", { id, token })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        console.log(data, "data")
        e.preventDefault();
        try {
            const url = `${apiUrl}`;
            const result = await axios.post(`${url}/Reset_Password/${id}/${token}`, { data })
            .then((response)=>{
                console.log(response.data, "response")
                localStorage.setItem("token", response.token);
                history('/');
                //Window.location.reload(false)
            })
            .catch((error)=>{
                alert('Error => ',error);
            })

            
         } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>

                       

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}

                        />

                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Reset Password
                        </button>
                       
                    </form>
                </div>
                <div className={styles.right}>
                   
                </div>
            </div>
        </div>
    );
};

export default Reset_Password;