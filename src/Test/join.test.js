import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StyleRoot}from 'radium';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {cleanup} from '@testing-library/react';
import Join from '../Containers/Join/Join';


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
history.push('/join');

beforeEach(()=>{
    store = mockStore(initialState); 
   
    wrapper = mount( <Provider store={store} >
                        <StyleRoot> 
                          <Join history={history}/> 
                        </StyleRoot> 
                     </Provider>
                    );
});

afterEach(()=>{
    jest.clearAllMocks();
});


describe('Join.js tests', ()=>{
    

    it ('Should render all components', ()=>{

        expect(wrapper.find('input[type="text"]').length).toEqual(2);

        expect(wrapper.find('input[type="password"]').length).toEqual(1);

        expect(wrapper.find('input[type="email"]').length).toEqual(1);

        expect(wrapper.find('input[type="radio"]').length).toEqual(2);  

        expect(wrapper.find('.l1').length).toEqual(1);  
        expect(wrapper.find('.l2').length).toEqual(1);  
        expect(wrapper.find('.l3').length).toEqual(1);  
        expect(wrapper.find('.l4').length).toEqual(1);  
        expect(wrapper.find('.l5').length).toEqual(1);
        expect(wrapper.find('.l6').length).toEqual(1);    
        expect(wrapper.find('.l7').length).toEqual(1);  
        

    });

    it('Should trigger form submit when all fields are valid', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'email@email.com',
              name:'name'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0987665444';
        phone.simulate('change');

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

            const radio = wrapper.find('input').at(4);
            radio.instance().value ='male';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('');

    });

    it('Should return error when all fields are empty', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: ''
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='';
        phone.simulate('change');

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

            const radio = wrapper.find('input').at(4);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('All fields are required');

    });

    it('Should return error when name is  empty', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: ''
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0754564534';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'k@gmail.com',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'fkdkfdkfdkfk',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Name is required');

    });

    it('Should return error when name is  less than 2 characters', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'a'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0754564534';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'k@gmail.com',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'fkdkfdkfdkfk',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Name should be atleast 2 characters');

    });

    it('Should return error when email is  empty', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'John'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0754564534';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: '',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'fkdkfdkfdkfk',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Email is required');

    });

    it('Should return error when email is invalid', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'John'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0754564534';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'ld@d',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'fkdkfdkfdkfk',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Invalid Email');

    });

    it('Should return error when phone is empty', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'John'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'ldd@gmial.com',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'fkdkfdkfdkfk',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Phone is required');

    });

    it('Should return error when password is empty', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'John'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='07567887765';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'ldd@gmial.com',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: '',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Password is required');

    });


    it('Should return error when password is invalid', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'John'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0754545656';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'ldd@gmial.com',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'f',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='female';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Password Must be atleast 6 characters');

    });

    it('Should return error when gender is empty', ()=>{

        wrapper.find('input[type="text"]').first().simulate('change', {
            target: {
              value: 'John'
            },
          });

          
        const phone = wrapper.find('input').at(2);
        phone.instance().value ='0754545454';
        phone.simulate('change');

        wrapper.find('input[type="email"]').simulate('change', {
            target: {
              value: 'ldd@gmial.com',
            },
          });
  
  
          wrapper.find('input[type="password"]').simulate('change', {
              target: {
                value: 'fkjjjjj',
              },
            });

            const radio = wrapper.find('input').at(5);
            radio.instance().value ='';
            radio.simulate('change');
  
            const form = wrapper.find('form');
  
            form.simulate('submit');
  
            expect( wrapper.find('.textDanger').text() ).toBe('Gender is required');

    });

    it('Should trigger call to loadSignInPage', ()=>{

        expect(wrapper.find('.l7').simulate('click')).toBeTruthy();

    });


});
