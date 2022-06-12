import axios from "axios"


const REMOTE_URL = `https://backend-faceapp.herokuapp.com`
const API_URL = `${REMOTE_URL}/api/profile/`


const getProfiles = async(roomID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + roomID, config)
    return response.data
}


const profileService = {
    getProfiles
}


export default profileService