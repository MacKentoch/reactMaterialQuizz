/// <reference path="../../../typings/mocha/mocha.d.ts" />

import chai               from 'chai';
import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import MdlAppNavBar       from '../../../src/app/components/mdl/MdlAppNavBar';

const expect = chai.expect;

describe('MdlAppNavBar', () => {
  let renderedMdlAppNavBar;
 
   describe('title', ()=> {
    it(`title span should be "" by default (when no title attribute sepcified)`, () => {
      renderedMdlAppNavBar = TestUtils.renderIntoDocument(<MdlAppNavBar />);
      let titleSpan = TestUtils.findRenderedDOMComponentWithClass(renderedMdlAppNavBar, 'mdl-layout-title');
      expect(titleSpan.textContent).to.eql('');
    }); 

    it(`title span should be "a test title"`, () => {
      renderedMdlAppNavBar = TestUtils.renderIntoDocument(<MdlAppNavBar title={'a test title'} />);
      let titleSpan = TestUtils.findRenderedDOMComponentWithClass(renderedMdlAppNavBar, 'mdl-layout-title');
      expect(titleSpan.textContent).to.eql('a test title');
    });
   });
  
  
});
