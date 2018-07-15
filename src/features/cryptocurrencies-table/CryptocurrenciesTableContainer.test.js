import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import CryptocurrenciesTableContainer from './CryptocurrenciesTableContainer';
Enzyme.configure({ adapter: new Adapter() });

it('renders CryptocurrenciesTableComponent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CryptocurrenciesTableContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('check CryptocurrenciesTableContainer did mount', () => {
  const componentWrapper = shallow(<CryptocurrenciesTableContainer />);
  const componentInstance = componentWrapper.instance();
  componentInstance.componentDidMount();
});

test('check CryptocurrenciesTableContainer load data', () => {
  const componentWrapper = shallow(<CryptocurrenciesTableContainer />);
  const componentInstance = componentWrapper.instance();
  componentInstance.loadData();
});


