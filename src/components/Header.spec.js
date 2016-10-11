import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

import Header from './Header';

describe('<Header />', () => {
  const wrapper = mount(<Header />);
  it('should render an h2 tag', () => {
    expect(wrapper.find('h2').length).toEqual(1);
  });

  it('should render a paragraph', () => {
    expect(wrapper.find('p').length).toEqual(1);
  });
});