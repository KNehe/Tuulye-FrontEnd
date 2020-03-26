
const initialState = {
    name:'',
    isLoggedIn: false,
    role:'',
    showDrawer:false
};

const reducer = (state = initialState, action) =>{
    
    if(action.type === 'LOGGED_IN'){

        return {
            isLoggedIn: action.value,
            role: action.role,
            name:action.name
        }
    }

    if(action.type === 'LOGOUT' ){
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.clear();
        return{
            isLoggedIn:null,
            role:null,
            name:null
        }
        
    }

    if(action.type === 'SHOW_DRAWER'){
        return{
            showDrawer: true
        }
    }

    if(action.type === 'HIDE_DRAWER'){
        return{
            showDrawer: false
        }
    }

    return state;
};

export default reducer;