import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import 'jsdom-global/register';

import Header from './Header';

describe('<Header />', () => {
  before(function() {
    this.jsdom = require('jsdom-global')();
  });
  const wrapper = shallow(<Header />);
  it('should render an h2 tag', () => {
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('should render a paragraph', () => {
    expect(wrapper.find('p').length).toEqual(1);
  });
  after(function() {
    this.jsdom();
  });
});