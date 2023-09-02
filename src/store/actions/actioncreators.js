const port = process.env.PORT || 5000 ;
const host = `http://localhost:${port}` ;

export const fetchAllPosts = () => { return async(dispatch) => {
    let url = `${host}/posts/` ;
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json' ,
        },
      });
    const data = await response.json() ;
    
    dispatch({
        type : "FETCH_ALL" ,
        payload : data  
    })
}}
export const fetchUserPosts = () => { return async(dispatch) => {
    let url = `${host}/posts/fetchUserPosts/` ;
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem('token')
        },
      });
    const data = await response.json() ;
    
    dispatch({
        type : "FETCH_USER_POSTS" ,
        payload : data  
    })
}}
export const createPost = (title , message , creator , tags , selectedFile) => { return async(dispatch) => {
    let url = `${host}/posts/createpost` ;
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title , message , creator , tags , selectedFile}) 
      });
    const data = await response.json() ;
    dispatch({
        type : "CREATE" ,
        payload : data 
    })
}}

export const updatePost = (title , message , creator , tags , selectedFile , id) => { return async(dispatch) => {
    let url = `${host}/posts/${id}` ;
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title , message , creator , tags , selectedFile}) 
      });
    const data = await response.json() ;
    dispatch({
        type : "UPDATE" ,
        payload : data 
    })
}}

export const deletePost = (id) => { return async (dispatch) => {
    let url = `${host}/posts/${id}` ;
    const response = await fetch(url , {
        method : "DELETE" ,
        headers : {
            'Content-Type': 'application/json' ,
            'auth-token': localStorage.getItem('token')
        },
    })
    const data = await response.json() ;
    dispatch({
        type : "DELETE" ,
        payload : data 
    })
}
}


export const likePost = (id) => {
    return async (dispatch) => {
       let url = `${host}/posts/${id}/likePost` ;
       const response = await fetch(url , {
           method : 'PUT' ,
           headers : {
               "Content-Type" : "application/json" ,
           }
       })
       const data = await response.json() ;
       dispatch({
           type : "LIKE" ,
           payload : data 
       })
   }

}

export const getuserData = () => {
    return async (dispatch) => {
        let url = `${host}/auth/getuser` ;
        const response = await fetch(url , {
            method : "POST" ,
            headers : {
                "Content-Type" : "application/json" ,
                "auth-token" : localStorage.getItem('token') 
            }
        })
        const data = await response.json() ;
        dispatch({
            type : "GET_USER_DATA" ,
            payload : data
        })

    }
}

export const updateUserData = (name , email , password , profileImage) => {
    return async (dispatch) => {
        let url = `${host}/auth/updateuserdata` ;
        const response = fetch(url , {
            method : "PUT" ,
            headers : {
                "Content-Type" : "application/json" ,
                "auth-token" : localStorage.getItem('token') 
            },
            body : JSON.stringify({name , email , password, profileImage})
        });
        const data = (await response).json()
        dispatch({
            type : "UPDATE_USER_DATA" ,
            payload : data 
        })
    }
}
    