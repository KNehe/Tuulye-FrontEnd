import actions from './actions';

const initialState  = {
    emailSent:false
}

const reducer = (state = initialState,action) =>{

    if(action.type === actions.FORGOT_PASSWORD_EMAIL_SENT_TRUE){
        return{
            emailSent:true
        }
    }

    if(action.type === actions.FORGOT_PASSWORD_EMAIL_SENT_FALSE){
        return{
            emailSent:false
        }
    }

    return state;
}

export default reducer;