import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/SignUp/index";
import Login from "./components/Login/index";
import Update  from "./components/Main/update";
import EmailVerify from "./components/EmailVerify/index";
import UserProfile from "./components/UserProfile";
import Change_Password from "./components/Change_Password/index";
import Reset_Password from "./components/Reset_Password/index";
import SpeechCommand from "./speechCommands/index";

function App() {
	const user = localStorage.getItem("token");
	const resetpassword = localStorage.getItem('token')

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} /> }
			<Route path="/update/:id" exact element={user ?  <Update /> : <Login/> } />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/UserProfile" exact element={<UserProfile />} />
			<Route path="/Change_Password" exact element={resetpassword ? <Login/> : <Change_Password />} />
			<Route path="/Reset_Password/:id/:token" exact element={resetpassword ? <Login/> : <Reset_Password />} />

			<Route path="/SpeechCommand" exact element={user ? <SpeechCommand /> : <Login/>} />


			{/* <Route path="/users/:id/verify/:token" element={<EmailVerify />} /> */}
		</Routes>
	);
}

export default App;