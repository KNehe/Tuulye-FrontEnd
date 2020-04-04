import React from 'react';
import Landing from '../Components/Landing/Landing';
import configureStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StyleRoot}from 'radium';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {cleanup} from '@testing-library/react';




Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

afterEach(cleanup);

let wrapper;
let store;


const initialState = {
    auth:{
        isLoggedIn:false,
        role:''
    },
    
};

const history = createMemoryHistory();
history.push('/');


   describe('Landing.js',()=>{

    store = mockStore(initialState); 
   
    wrapper = mount( <Provider store={store} >
                        <StyleRoot> 
                          <Landing history={history}/> 
                        </StyleRoot> 
                     </Provider>
                    ); 

    it('Should display landing page initially with signIn and Join buttons', ()=>{
       
        const signInBtn = wrapper.find('.Btn');
        const joinBtn = wrapper.find('.BtnJoin');

        const title1 = wrapper.find('.Text1')
        const title2 = wrapper.find('.Text2');

        expect(title1).toBeDefined();
        expect(title2).toBeDefined()  

        expect(signInBtn).toBeDefined();
        expect(joinBtn).toBeDefined();

    });

    it ('Should simulate click on signIn button and cause call to loadSignInPage()', ()=>{

        const signInBtn = wrapper.find('.Btn');

        signInBtn.simulate('click');
        
       });  

       it ('Should simulate click on Join button and cause call to loadJoinPage()', ()=>{

        const joinBtn = wrapper.find('.BtnJoin');

        joinBtn.simulate('click'); 
        
       }); 

       it ('Should find continue button when user is logged in', ()=>{

        const initialState = {
            auth:{
                isLoggedIn:true,
                role:''
            },
            
        };

        store = mockStore(initialState); 
   
        wrapper = mount( <Provider store={store} >
                            <StyleRoot> 
                              <Landing history={history}/> 
                            </StyleRoot> 
                         </Provider>
                        ); 

        const btnContinue = wrapper.find('.btnContinue');

        btnContinue.simulate('click'); 
        
       });

   });

  



