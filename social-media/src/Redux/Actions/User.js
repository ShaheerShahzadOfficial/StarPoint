import axios from "axios"


import {
    // UPDATE_PROFILE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL,
     UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD, UPDATE_PASSWORD_FAIL,} from "../Constant"






// export const UpdateProfile = (name, email) => async (dispatch) => {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });


//     await axios.put("http://localhost:4000/user/updateProfile", {
//         name, email
//     }, { withCredentials: true, credentials: "include" }).then((result) => {
//         dispatch({
//             type: UPDATE_PROFILE,
//             payload: result.data
//         })
//     }).catch((err) => {
//         dispatch({
//             type: UPDATE_PROFILE_FAIL,
//             payload: err.response.data.message
//         })
//     });

// }


export const UpdateUsersPassword = (oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });


    await axios.put("http://localhost:4000/user/updatePassword", {
        oldPassword, newPassword
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: UPDATE_PASSWORD,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: err.response.data.message
        })
    });

}
