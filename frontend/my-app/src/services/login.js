import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export const authLogin = async(data) =>{
    console.log("Logindata",data);
    return await axios.post(`${apiUrl}/api/auth`,data)
                    .then((response) =>{
                        return response.data;
                    })
                    .catch((error) =>{
                        alert(error.message);
                        return error.message;
                    })
}