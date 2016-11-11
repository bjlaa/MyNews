import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Header from './Header';

describe('<Header />', () => {
  it('should render a header called \'MyNews\'', () => {
    const wrapper = shallow(<Header />);
    const actual = wrapper.find('h2').text();
    const expected = 'MyNews';

    expect(actual).to.equal(expected);
  });

  it('should render one paragraph', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('p').length).to.equal(1);
  });
});