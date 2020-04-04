import React from 'react';


import About from '../Components/About/About';

import {render, cleanup} from '@testing-library/react';

afterEach(cleanup);

it( 'It should render the about messaage', ()=>{

    const { getByText } = render(<About />);

    expect(getByText(/We/i).textContent).toBe("We are organization based in Uganda. We aim at providing clients with  food at any time anywhere.");

})
