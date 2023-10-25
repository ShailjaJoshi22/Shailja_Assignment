import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaEdit, FaTrash } from "react-icons/fa"

const apiUrl = process.env.REACT_APP_API_URL;


const UserProfile = ({ userId }) => {
    const user = localStorage.getItem("token");
    console.log(user,"emailid for profilepic");
    const [profilePicUrl, setProfilePicUrl] = useState(null);

    useEffect(() => {
        const userId = user
        const fetchProfilePic = async () => {
            try {
                const response = await axios.get(`${apiUrl}/profile-pic/${userId}`)
                console.log("response", response)

                const blob = new Blob([response], { type: 'image/jpeg' });

                // const imageUrl = `${response.data}` // Create a temporary URL for the Blob

                const imageData = response.data

                // Create a new Image element
                const img = new Image();

                setProfilePicUrl(imageData);
            } catch (error) {
                console.error('Error occurred while fetching profile picture:', error);
            }
        };

        fetchProfilePic();
    }, [userId]);

    return (
        <div style={{display:'flex'}}>
            {profilePicUrl ? (
                <img
                    src={`data:image/jpeg;base64,${profilePicUrl}`}
                    alt="Profile"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
            ) : (
                <FaUser />
            )}
        </div>
    );
};

export default UserProfile;
