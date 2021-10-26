import { FETCH, THROW_ERROR, RESET_ERROR, SET_SALES } from "../types"
import axios from "axios";

export const fetch = (cb)=> (dispatch) =>{
    dispatch({ type: RESET_ERROR })

    axios.post('https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub',{
        "angular_test": "angular-developer"
    })
        .then((response) => {
            console.log(response.data);
            dispatch({ type: FETCH, payload:response.data });
            dispatch({ type: SET_SALES});
            cb();
        }, (error) => {
            console.log(error);
            dispatch({ type: THROW_ERROR });
            cb();
        });
}