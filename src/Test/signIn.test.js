import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StyleRoot}from 'radium';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {cleanup} from '@testing-library/react';
import SignIn from '../Containers/SignIn/SignIn';


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
history.push('/signin');

beforeEach(()=>{
    store = mockStore(initialState); 
   
    wrapper = mount( <Provider store={store} >
                        <StyleRoot> 
                          <SignIn history={history}/> 
                        </StyleRoot> 
                     </Provider>
                    );
});




describe('SignIn.js', ()=>{

    it('Should have all fields',()=>{

        expect(wrapper.find('input[type="email"]').length).toEqual(1);

        expect(wrapper.find('input[type="password"]').length).toEqual(1);

        expect(wrapper.find('.SignInScreenBtn').length).toEqual(1);

        expect(wrapper.find('.ImageSection').length).toEqual(1); 
        
        expect(wrapper.find('.label1').length).toEqual(2); 

        expect(wrapper.find('.label2').length).toEqual(1); 

        expect(wrapper.find('.label3').length).toEqual(1); 

        expect(wrapper.find('.SignInMain').length).toEqual(1);
    
    });


    it('Should enter text into fields and trigger form submit', () => {


        wrapper.find('input[type="email"]').simulate('change', {
          target: {
            value: 'email@email.com',
          },
        });


        wrapper.find('input[type="password"]').simulate('change', {
            target: {
              value: 'mysecret',
            },
          });

          const form = wrapper.find('form');

          form.simulate('submit');

          expect( wrapper.find('.textDanger').text() ).toBe('');


      });

     
      it('Should trigger form submit with empty fields and return error', () => {


        wrapper.find('input[type="email"]').simulate('change', {
          target: {
            value: '',
          },
        });


        wrapper.find('input[type="password"]').simulate('change', {
            target: {
              value: '',
            },
          });

          const form = wrapper.find('form');

          form.simulate('submit');

          expect( wrapper.find('.textDanger').text() ).toBe('All fields are required');

      });

      it('Should return error when only email field is empty', () => {


        wrapper.find('input[type="email"]').simulate('change', {
          target: {
            value: '',
          },
        });


        wrapper.find('input[type="password"]').simulate('change', {
            target: {
              value: 'passwors',
            },
          });

          const form = wrapper.find('form');

          form.simulate('submit');

          expect( wrapper.find('.textDanger').text() ).toBe('Email is required');

      });

      it('Should return error when only password field is empty', () => {


        wrapper.find('input[type="email"]').simulate('change', {
          target: {
            value: 'k@gmail.com',
          },
        });


        wrapper.find('input[type="password"]').simulate('change', {
            target: {
              value: '',
            },
          });

          const form = wrapper.find('form');

          form.simulate('submit');

          expect( wrapper.find('.textDanger').text() ).toBe('Password is required');

      });

      it('Should return error email is invalid', () => {


        wrapper.find('input[type="email"]').simulate('change', {
          target: {
            value: 'kgmail.com',
          },
        });


        wrapper.find('input[type="password"]').simulate('change', {
            target: {
              value: '',
            },
          });

          const form = wrapper.find('form');

          form.simulate('submit');

          expect( wrapper.find('.textDanger').text() ).toBe('Invalid Email');

      });
      



      it('Should trigger change to join page', ()=>{

        wrapper.find('.label3').simulate('click');
        
      });


    
    

});