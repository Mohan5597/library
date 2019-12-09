import axios from '../config/axios'

export const listBooks=(books) =>{
    return {
        type:'LIST_BOOKS',
        payload:books
    }
}

export const startListBooks=() =>{
    return(dispatch)=>{
        axios.get('/books',{
            headers:{'x-auth':localStorage.getItem('userAuth')}
        })
        .then(response =>{
            dispatch(listBooks(response.data))
        })

    }
}

export const removeBook=(id) =>{
    return{
        type:"REMOVE_BOOK",
        payload:id

    }
}

export const startRemoveBook=(id) =>{
    return(dispatch) =>{
        axios.delete(`/books/${id}`,{
            headers:{'x-auth':localStorage.getItem('userAuth')}
        })
        .then(response =>{
           dispatch(removeBook(response.data))
        })
    }
}