import React from 'react';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import SlimEligibilityCalculator from '../../components/calculator/slim-eligibility-calculator';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() }); 

const initialState = {}; 
const mockStore = configureStore();
let wrapper;
let store;
beforeEach(() => {
  store = mockStore(initialState);
 })

describe('SlimEligibilityCalculator UI component', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <SlimEligibilityCalculator store={store}/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
