import chai               from 'chai';
import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import MdlAppNavBar       from '../../../src/app/components/mdl/MdlAppNavBar';

const expect = chai.expect;

describe('When no theme is specified, AppBar', () => {
  let renderedMdlAppNavBar
 
  beforeEach(() => {
    renderedMdlAppNavBar = TestUtils.renderIntoDocument(<MdlAppNavBar title={'test'} />);
  });  
  
  it(`title span should contain "test"`, () => {
    let titleSpan = TestUtils.findRenderedDOMComponentWithClass(renderedMdlAppNavBar, 'mdl-layout-title');
    expect(titleSpan.textContent).to.eql('test');
  });
  
  
});