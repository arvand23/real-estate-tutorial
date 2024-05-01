import axios from "axios"

export const backendURL = "http://127.0.0.1:3000"
export const axiosInstance = (()=> axios.create({baseURL: backendURL}))();

axiosInstance.interceptors.response.use(
    (response) => response,
    (error, request) => {
        error.message = error.response?.data?.error || (error.response?.data?.errors ? JSON.stringify(error.response?.data?.errors) : error.message);

        return Promise.reject(error);
    }

);