import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export const user_registration = async(data) =>{
    console.log("register",data);
    const url = `${apiUrl}/api/registeration`;

    return  await axios.post(url, data);
                    // .then((response) =>{
                    //     return response.data;
                    // })
                    // .catch((error) =>{
                    //     alert(error.message);
                    //     return error.message;
                    // })
}