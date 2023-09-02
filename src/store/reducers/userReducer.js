const userData = (state = {}, action) => {
    switch (action.type) {
        case "GET_USER_DATA":
            return action.payload;
        case "UPDATE_USER_DATA":
            return action.payload;
        default:
            return state;
    }
}

export default userData;