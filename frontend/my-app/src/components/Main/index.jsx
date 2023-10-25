import styles from "./styles.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import UserProfile from "../UserProfile/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDisplay, faMicrophone } from '@fortawesome/free-solid-svg-icons'; // Import the desired Font Awesome icon
import { faGoogle, faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaEdit, FaTrash } from "react-icons/fa"

import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
const apiUrl = process.env.REACT_APP_API_URL;


const Main = () => {
	const user = localStorage.getItem("token");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/users/`)
      .then((res) => res.json())
      .then((response) => {
        setUsers(response);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handelDelete = async (id) => {
    try {
      console.log("delete id", id)
      axios.delete(`${apiUrl}/api/users/deleteUser/` + id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }

  }

  const handlevoiceclick = () => {
    console.log("voice click")
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
      
        <h1 style={{display:'flex'}}> <UserProfile /> <div>  {user} </div></h1>
        {users.firstName}

        <button className={styles.white_btn} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
        <div>
          <span><Link to="https://www.google.com/search?keywords=My+Search+Parameters"><FontAwesomeIcon icon={faGoogle} size="2x" color="black" /></Link></span>
          <span><Link to="https://www.youtube.com/"><FontAwesomeIcon icon={faYoutube} size="2x" color="red" /></Link></span>
          <Link to="https://twitter.com/?lang=en"><FontAwesomeIcon icon={faTwitter} size="2x" color="skyblue" /></Link>
          <Link to="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} size="2x" color="blue" /></Link>
          <Link to="/SpeechCommand"><FontAwesomeIcon icon={faMicrophone} size="2x" color="grey" /></Link><br />
        </div>
      </nav>
      <div>
        {/* <h1>users</h1> */}
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Gender</th>
              <th scope='col'>Country</th>
              <th scope='col'>State</th>
              <th scope='col'>City</th>
              <th scope='col'>ZipCode</th>
              <th scope='col'>area_of_Interest</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              users.map((user) => {
                return <tr>
                  <td>{user._id}</td>
                  <td>{user.firstName + " "}{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.state}</td>
                  <td>{user.city}</td>
                  <td>{user.zipCode}</td>
                  <td>{user.area_of_Interest}</td>
                  <td><Link to={`/update/${user._id}`}><FaEdit /></Link>
                    <button onClick={(e) => handelDelete(user._id)}><FaTrash size={24} color="red" /></button></td>

                </tr>
              })
            }
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
};

export default Main;