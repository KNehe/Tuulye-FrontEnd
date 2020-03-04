
const initialState = {
    userName:'Nehemiah',
    isLoggedIn: false,
    role:''
};

const reducer = (state = initialState, action) =>{
    
    if(action.type === 'LOGGED_IN'){

        return {
            isLoggedIn: action.value,
            role: localStorage.getItem('role'),
            userName:localStorage.getItem('name')
        }
    }
    return state;
};

export default reducer;