import axios from 'axios'
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_MY_POST_FAIL, GET_MY_POST_REQUEST, GET_MY_POST_SUCCESS } from '../Constant'


export const  CreatePost = (caption, files, Filetype) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST })

    const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true, credentials: 'include' }
  
    await axios
      .post(
        'https://social-app-backend.vercel.app/post/upload',
        {   
            caption, files, Filetype
        },
        config,
      ).then((result) => {
        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: result?.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: CREATE_POST_FAIL,
          payload: err?.response?.data,
        })
      })
}


export const  DeletePost = (id) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST })

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  
    await axios
      .delete(
        `https://social-app-backend.vercel.app/post/deletePost/${id}`,
        config,
      ).then((result) => {
        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: result?.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: CREATE_POST_FAIL,
          payload: err?.response?.data,
        })
      })
}

export const  getPostOfFollowing = (id) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST })

    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  
    await axios
      .get(
        `http://localhost:4000/post/getPostOfFollowing`,
        config,
      ).then((result) => {
        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: result?.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: CREATE_POST_FAIL,
          payload: err?.response?.data,
        })
      })
}

export const MyPost = () => async (dispatch)=>{
    dispatch({ type: GET_MY_POST_REQUEST })

    const config = {withCredentials: true, credentials: 'include'}
  
    await axios
      .get(
        `https://social-app-backend.vercel.app/user/getMyPosts`,
        config,
      ).then((result) => {
        dispatch({
          type: GET_MY_POST_SUCCESS,
          payload: result?.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_MY_POST_FAIL,
          payload: err?.response?.data,
        })
      })
}