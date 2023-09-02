const posts = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "FETCH_USER_POSTS" :
      return action.payload;
    case "LIKE":
      return action.payload.map((post) => (post._id === action.payload._id ? action.payload : post));
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((post) => (post._id === action.payload._id ? action.payload : post));
    case "DELETE":
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};

export default posts ;