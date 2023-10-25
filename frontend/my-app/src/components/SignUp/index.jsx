import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import CountryDropdown from '../Dropdown_Components/country_dropdown';
import StateDropdown from '../Dropdown_Components/state_dropdown';
import CityDropdown from '../Dropdown_Components/city_dropdown';
import citiesList from '../Assets/cities'; // Import the list of countries
import { user_registration } from "../../services/registration";
import Reset from "../Features/reset";
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"

const apiUrl = process.env.REACT_APP_API_URL;

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "",
		country: "",
		state: "",
		city: "",
		zipCode: "",
		area_of_Interest: '',

	});

	const handleFormReset = () => {
		setData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			gender: "",
			country: "",
			state: "",
			city: "",
			zipCode: "",
			area_of_Interest: '',
		});
	  };

	const [gender, setGender] = useState('');
	const [files, setFiles] = useState(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [areaOfInterest, setAreaOfInterest] = useState([]);
	const [isValidEmail, setIsValidEmail] = useState(true);
	// -----------file--------->

	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		console.log(value);

		if (e.target.checked) {
			setAreaOfInterest([...areaOfInterest, value]);
		} else {
			setAreaOfInterest(areaOfInterest.filter((hobby) => hobby !== value));
		}

		// data.area_of_Interest = areaOfInterest.toString();
	};

	const handleFileChange = (e) => {
		const selectedFile = Array.from(e.target.files);
		console.log("-----------file", selectedFile)
		setFiles(selectedFile);
	};


	const handleFileUpload = () => {
		const formData = new FormData();

		console.log("--emailID---uploadfile", data.email)

		files.forEach((file, index) => {
			if (file[index] !== null) {
				formData.append(`file${index}`, file);
				console.log("-----uploadfile", file)
			}
		});

		if (!files) {
			setError('Please select a file.');
			return;
		} else {

			fetch(`${apiUrl}/uploads/${data.email}`, {
				method: 'POST',
				body: formData,
			})
				.then(response => response.json())
				.then(data => {
					console.log('Upload successful:', data);
				})
				.catch(error => {
					console.error('Error uploading files:', error);
				});
		}
	};

	//   ------------------------


	const handleGenderChange = (gender) => {
		data.gender = gender;
	};

	const handleChange = ({ currentTarget: input }) => {
		console.log(input.value)
		setData({ ...data, [input.name]: input.value });

		const inputEmail = input.value;
		// Regular expression for validating an Email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// Check if the input matches the email format
		setIsValidEmail(emailRegex.test(inputEmail));
		if (isValidEmail) {
			console.log(data.email, "data.email")
			// setEmailID(data.email);
		}

	};

	// ------------submit---------->
	const handleSubmit = async (e) => {
		e.preventDefault();

		data.area_of_Interest = areaOfInterest.toString();
		if (data.password !== data.confirmPassword) {
			alert("Passwords don't match");
		} else {
			try {
				const url = `${apiUrl}/api/registeration`;
				const { data: res } = await axios.post(url, data);
				navigate("/login");
				console.log(res.message);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							<FaSignInAlt/>Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
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

						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={styles.input}

						/>

						<div onChange={handleGenderChange(gender)}>
							<label>
								<input
									className={styles.input}

									type="radio"
									name="gender"
									value="male"
									onChange={(e) => {
										setGender(e.target.value)
									}}
								/><strong>
									Male</strong>
							</label>
							<label>
								<input
									className={styles.input}

									type="radio"
									name="gender"
									value="female"
									onChange={(e) => {
										setGender(e.target.value)
									}}
								/><strong>
									Female</strong>
							</label>
						</div>

						<div className="row">
							<label className="areaOfInterest form__label" for="areaOfInterest">Area Of Interest </label>
							<div className=" checkBox">
								<input type="checkbox" id="books" name="books" value="Reading Books" checked={areaOfInterest.includes('Reading Books')} onChange={handleCheckboxChange} />
								<label for="books">&nbsp; Reading Books</label><br />
								<input type="checkbox" id="cricket" name="cricket" value="Playing Cricket" checked={areaOfInterest.includes('Playing Cricket')} onChange={handleCheckboxChange} />
								<label for="cricket">&nbsp; Playing Cricket</label><br />
								<input type="checkbox" id="Bikes" name="Bikes" value="Riding Bikes" checked={areaOfInterest.includes('Riding Bikes')} onChange={handleCheckboxChange} />
								<label for="Bike">&nbsp; Riding Bikes</label>
							</div>
						</div>
						<ul><label><strong>Country</strong></label>
							<CountryDropdown onChange={handleChange} value={data.country} />
							<br />
							<label><strong>State:</strong></label>
							<StateDropdown onChange={handleChange} value={data.state} selectedcountry={data.country} />
							<br />
							<label><strong>City:</strong></label>
							<select name="city" value={data.city} onChange={handleChange}>
								<option value={data.city}>{data.city}</option>
								{citiesList.map((city, index) => (
									city.state_name == data.state
										? (<option key={index} value={city.name}>
											{city.name}
										</option>)
										: ""
								))}
							</select>
						</ul>

						<input type="file" onChange={handleFileChange} />
						<button onClick={handleFileUpload}>Upload</button>

						<input
							type='text'
							placeholder="Zipcode"
							name='zipCode'
							onChange={handleChange}
							value={data.zipCode}
							required
							className={styles.input}
						/>

						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing Up
						</button>
						<button type="reset" className={styles.green_btn} onClick={handleFormReset}>
							Reset
						</button>
						{/* <Reset resetFormFields={handleFormReset} /> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;