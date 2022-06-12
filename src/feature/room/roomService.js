import axios from 'axios'

const REMOTE_URL = `https://backend-faceapp.herokuapp.com`
const API_URL = `${REMOTE_URL}/api/room/`



const createRoom = async(roomData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.post(API_URL, roomData, config)
    return response.data
}

const getRooms = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const deleteRooms = async(roomID, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.delete(API_URL + roomID, config)
      return response.data
}




const roomService = {
    createRoom,
    getRooms,
    deleteRooms
}

export default roomService