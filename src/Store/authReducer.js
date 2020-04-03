import actions from './actions';

const initialState = {
    name:'',
    isLoggedIn: false,
    role:''
};

const reducer = (state = initialState, action) =>{
    
    if(action.type === actions.LOGGED_IN){

        return {
            isLoggedIn: action.value,
            role: action.role,
            name:action.name
        }
    }

    if(action.type === actions.LOGOUT ){
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.clear();
        return{
            isLoggedIn:false,
            role:'',
            name:''
        }
        
    }


    return state;
};

export default reducer;