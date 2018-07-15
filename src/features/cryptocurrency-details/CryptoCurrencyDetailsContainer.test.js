import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import CryptocurrencyDetailsContainer from './CryptocurrencyDetailsContainer';
Enzyme.configure({ adapter: new Adapter() });

it('renders CryptocurrencyDetailsContainer without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CryptocurrencyDetailsContainer match={{params: {id: 1}}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('check CryptocurrencyDetailsContainer did mount', () => {
  const componentWrapper = shallow(<CryptocurrencyDetailsContainer match={{params: {id: 1}}}/>);
  const componentInstance = componentWrapper.instance();
  componentInstance.componentDidMount();
});