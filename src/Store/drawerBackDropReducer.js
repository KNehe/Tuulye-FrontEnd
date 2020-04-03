import actions from './actions';

const initialState = {
    showDrawer:false,
    showBackDrop:false
};

const reducer = (state = initialState, action) =>{
     

    
    if(action.type === actions.SHOW_BACKDROP_DRAWER){
        return{
            showDrawer: true,
            showBackDrop: true
        }
    }

    if(action.type === actions.HIDE_BACKDROP_DRAWER){
        return{
            showDrawer: false,
            showBackDrop: false
        }
    }

    if(action.type === actions.SHOW_BACKDROP){
        return{
            showBackDrop: true
        }
    }

    if(action.type === actions.HIDE_BACKDROP){
        return{
            showBackDrop: false
        }
    }


    if(action.type === actions.SHOW_DRAWER){
        return{
            showDrawer: true,
            showBackDrop:true,
        }
    }

    if(action.type === actions.HIDE_DRAWER){
        return{
            showDrawer: false
        }
    }


    return state;
};

export default reducer;