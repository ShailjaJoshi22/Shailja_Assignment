import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import CountryDropdown from '../Dropdown_Components/country_dropdown';
import StateDropdown from '../Dropdown_Components/state_dropdown';
import CityDropdown from '../Dropdown_Components/city_dropdown';
import UserProfile from "../UserProfile/index";

import citiesList from '../Assets/cities'; // Import the list of countries
const apiUrl = process.env.REACT_APP_API_URL;

const Update = () => {
	const { id } = useParams();
	console.log('update', id)
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
		area_of_Interest: [],

	});
	const [gender, setGender] = useState('');
	const [checkboxValues, setCheckboxValues] = useState([]);
	const [cityval, setCityval] = useState('')
	const [files, setFiles] = useState(null);
	const [options, setOptions] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [checkboxOptions, setCheckboxOptions] = useState(['Riding Bikes', 'Playing Cricket', 'Reading Books']); // Example options
	const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
	const [selectedRadioButtons, setSelectedRadioButtons] = useState([]);
	const [radiobuttonsOptions, setRadioButtonsOptions] = useState(['Male', 'Female']);
	const [areaOfInterest, setAreaOfInterest] = useState([]);
	const history = useNavigate();

	const [maleChecked, setMaleChecked] = useState();
	const [femaleChecked, setFemaleChecked] = useState();


	useEffect(() => {
		axios.get(`${apiUrl}/api/users/getupdate/${id}`)
			.then(res => {
				console.log("data id wise-->", res)
				setData({
					...data,
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					email: res.data.email,
					password: res.data.password,
					confirmPassword: res.data.confirmPassword,
					gender: res.data.gender,
					country: res.data.country,
					state: res.data.state,
					city: res.data.city,
					zipCode: res.data.zipCode,
					area_of_Interest: res.data.area_of_Interest,
				})
				// setOptions(res.data.area_of_Interest);
				// setAreaOfInterest((res.data.area_of_Interest).split(','))/

				console.log(">>>>>>>>>>>>>", res.data.area_of_Interest)
				console.log(String(data.area_of_Interest).split(","), "----")

				if (String(res.data.area_of_Interest).split(",")) {
					let interestsArray = String(res.data.area_of_Interest).split(",");
					setAreaOfInterest(interestsArray);
				}
				setGender(res.data.gender)
				if (String(res.data.gender) === 'Male' || String(res.data.gender) === 'male') setMaleChecked(true);
				if (String(res.data.gender) === 'Female' || String(res.data.gender) === 'female') setFemaleChecked(true);
			})
			.catch(err => console.log(err))
	}, [id])

	// -----------------logout------------>
	const handleLogout = () => {
		localStorage.removeItem("token");
		history('/login');
		window.location.reload();
	};

	// -----------file--------->

	const handleFileChange = (e) => {

		const selectedFile = Array.from(e.target.files);
		console.log("-----------file", selectedFile)
		setFiles(selectedFile[0]);
	};

	const handleFileUpload = () => {
		if (files && files.length > 0) {

			const formData = new FormData();
			//  if(files.length !== null){

			files.forEach((file, index) => {
				formData.append(`file${index}`, file);
				console.log("-----uploadfile", file)

			});

			fetch(`${apiUrl}/api/users/uploads`, {
				method: 'POST',
				body: formData,
			})
				.then(response => response.json())
				.then(data => {
					if (data) { window.localStorage.setItem("updated", true) }
					console.log('Upload successful:', data);
					navigate("/Main");

				})
				.catch(error => {
					console.error('Error uploading files:', error);
				});
		}
	};

	//   ------------citydropdown---------


	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		console.log(value);

		if (e.target.checked) {
			setAreaOfInterest([...areaOfInterest, value]);
		} else {
			setAreaOfInterest(areaOfInterest.filter((hobby) => hobby !== value));
		}

	};




	const handleGenderChange = (e) => {
		setGender(String(e.target.value));
		data.gender = e.target.value;
		console.log(data.gender)
		console.log(gender)

	};

	const handleChange = ({ currentTarget: input }) => {
		console.log(input.value)
		setData({ ...data, [input.name]: input.value });
	};

	// ------------submit---------->
	const handleSubmit = async (e) => {
		e.preventDefault();
		data.area_of_Interest = areaOfInterest.toString();
		console.log("areas of interest", data.area_of_Interest);
		if (data.password !== data.confirmPassword) {
			alert("Passwords don't match");
		} else {

			try {
				const result = await axios.put(`${apiUrl}/api/users/update/${id}`, data);
				if (result) {					
					history('/')

				}
				console.log(result);
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
							Sing in
						</button>
					</Link>
				</div>
				<nav >
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
					<UserProfile />

				</nav>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Update User Account</h1>
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

						<label><strong>Gender</strong></label>
						<div >
							<label>
								Male
							</label>
							<input
								type="radio"
								name="gender"
								checked={maleChecked}
								value='Male'
								onChange={handleGenderChange}
							/>
						</div>
						<div>
							<label>
								Female
							</label>
							<input
								type="radio"
								name="gender"
								value='Female'
								checked={femaleChecked}
								onChange={handleGenderChange}
							/>
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
							{/* <CityDropdown onChange={handleCityChange} value={data.city} selectedstate={data.state} /> */}
							{/* {City_Dropdown} */}
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

						{/* <label><strong>Select file:</strong></label>
						<input type="file" onChange={handleFileChange} />
						<button className={styles.green_btn} onClick={handleFileUpload}>Upload</button> */}

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
					</form>
				</div>
			</div>
		</div>
	);
};

export default Update;