import axios from './axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const createUser = (data) =>{
    return axios.post(apiUrl,data)
}

export const getAllUser = () =>{
    return axios.get(apiUrl)
}

export const getUserById = (id) =>{
    return axios.get(`${apiUrl}/${id}`)
}

export const updateUser = (id,data) =>{
    return axios.put(`${apiUrl}/${id}`,data)
}

export const deleteUser = (id) =>{
    return axios.delete(`${apiUrl}/${id}`)
}