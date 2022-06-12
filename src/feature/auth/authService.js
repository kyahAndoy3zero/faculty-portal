import axios from 'axios'

const REMOTE_URL = `https://backend-faceapp.herokuapp.com`
const API_URL = `${REMOTE_URL}/api/user/`



const register = async (userData) => {
    try{
        const response = await axios.post(API_URL, userData)

        if(response.data){
            return response.data
        }
    }catch(error){
        throw new Error('Invalid Credentials')
    }
}


const login = async (userData) => {
    try{
        const response = await axios.post(API_URL + 'login', userData)

        if(response.data){
            sessionStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data


    }catch(error){
        throw new Error('Invalid Credentials')
    }
}

const authService = {
    register,
    login
}

export default authService