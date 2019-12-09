const bookReducer=(state=[],action) =>{
    switch(action.type){
        case "LIST_BOOKS":
            return [...action.payload]
        case "REMOVE_BOOKS":
            return state.filter(book => book._id!==action.payload)
        default:
            return [...state]
    }
}
export default bookReducer