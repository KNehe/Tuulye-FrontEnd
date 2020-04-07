import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StyleRoot}from 'radium';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import {cleanup} from '@testing-library/react';
import Meals from './../Containers/Meals/Meals';
import axios  from 'axios';
import MockAdapter from 'axios-mock-adapter';




Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();

afterEach(cleanup);

let wrapper;
let store;


const initialState = {
    auth:{
        isLoggedIn:true,
        role:'user'
    },
    
};

const history = createMemoryHistory();
history.push('/meals');


beforeEach(()=>{
    store = mockStore(initialState); 

   
    wrapper = mount( <Provider store={store} >
                        <StyleRoot> 
                          <Meals history={history}/> 
                        </StyleRoot> 
                     </Provider>
                    );
});

// afterEach(()=>{
//     jest.clearAllMocks();
// });



describe('Meal.js tests',()=>{

    it ('Should not render meals',()=>{ 
      
      axios.defaults.headers['authorization'] = 'Bearer JWT1111';
      const mockAdapter = new MockAdapter(axios);
         
      mockAdapter.onGet('/meals/1/1').reply(200,{data:'mydata'});

        setImmediate(()=>{
          
        });

       

         expect(wrapper.find('.MealCard').length).toEqual(0);

    });

    // it('Should trigger search input and not return results ',()=>{


    //     wrapper.find('input[type="text"]').simulate('change', {
    //         target: {
    //           value: 'fkdkfdkfdkfk',
    //         },
    //       });

    //     expect(wrapper.find('.userSearch').text()).toBe('');
    // });

});