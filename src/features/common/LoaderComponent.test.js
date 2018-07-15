import React from 'react';
import ReactDOM from 'react-dom';
import LoaderComponent from './LoaderComponent';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

it('renders CryptocurrenciesTableComponent without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoaderComponent title='Test title' />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('check loader text', () => {
    const component = shallow(<LoaderComponent title='Test title' />);
    expect(component.find('h2').text()).toEqual('Test title...');

});


