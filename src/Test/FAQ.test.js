import React from 'react';

import {render, cleanup} from '@testing-library/react';
import FAQ from '../Components/FAQ/FAQ';

afterEach(cleanup);

it ('Should show all the FAQs and their answers', ()=>{

    const { getByText, getByTestId} = render(<FAQ/>);

    expect( getByText(/How/i).textContent ).toBe('  How do I receive my meal ?  We shall contact you');

    expect( getByText(/Where/i).textContent).toBe('   Where are your offices located ?  We have no offices');

    expect( getByTestId('Do').textContent).toBe('  Do you provide all kinds of meals ?   We only give what we have prepared');

    expect( getByTestId('When').textContent).toBe('  When do I pay for a meal ?  When you choose a meal of interest');


});