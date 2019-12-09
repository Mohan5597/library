import axios from '../config/axios'

export const registerUser = (user) => {
    return {
        type: 'REGISTER_USER',
        payload: user
    }
}



export const removeUser=(id) =>{
    return{
        type:'REMOVE_USER',
        payload:id
    }
}

