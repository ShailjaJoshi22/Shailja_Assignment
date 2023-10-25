import { useState } from "react";
// import axios from "axios";
import {FaSignInAlt} from "react-icons/fa"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { authLogin } from "../../services/login";
const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const history = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${apiUrl}/api/auth`;
			const { data: res } = authLogin(data)
			console.log(data);
			if (data) {
				localStorage.setItem("token", data.email);
				window.location = "/";
				console.log("logindata", data)
				history('/Main', { state: { data } })
			}
			else if(data.error){
                console.log(data)
                alert(data)
            }

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
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
						<FaSignInAlt/>Sing In
						</button>
						<Link to="/Change_Password">
						<button type="button" className={styles.green_btn}>
							Forgot Password
						</button>
					</Link>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>

				<div>
				<span><Link to="https://www.google.com/search?keywords=My+Search+Parameters"><FontAwesomeIcon icon={faGoogle} size="2x" color="black" /></Link></span>
          <span><Link to="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} size="2x" color="red" /></Link></span>
          <Link to="https://twitter.com/?lang=en"><FontAwesomeIcon icon={faTwitter} size="2x" color="skyblue" /></Link>
          <Link to="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} size="2x" color="blue" /></Link>
				</div>
			</div>
		</div>
	);
};

export default Login;