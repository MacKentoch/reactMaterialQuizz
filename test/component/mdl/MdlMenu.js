/// <reference path="../../../typings/mocha/mocha.d.ts" />

import chai               from 'chai';
import React              from 'react';
import TestUtils          from 'react-addons-test-utils';
import MdlMenu            from '../../../src/app/components/mdl/MdlAppNavBar';

const expect = chai.expect;

describe('MdlMenu', () => {
  let renderedMdlMenu;
 
   describe('MdlMenu items', ()=> {
    it(`MdlMenu should conatains 3 menu items`, () => {
      const Menus = [
        {name : 'menu1', disabled : false, mdlIconName : 'menu1Icon'},
        {name : 'menu2', disabled : false, mdlIconName : 'menu2Icon'},
        {name : 'menu3', disabled : false, mdlIconName : 'menuIcon'}
      ];
      renderedMdlMenu = TestUtils.renderIntoDocument(<MdlMenu menuId="testMenu" menus={Menus} />);
      let  menuItems  = TestUtils.scryRenderedDOMComponentsWithTag(renderedMdlMenu, 'li');
      expect(menuItems.length).to.equal(3);
    }); 
  });
  
  
   describe('MdlMenu button click', ()=> {
    it(`should open menu`, () => {
      const Menus = [
        {name : 'menu1', disabled : false, mdlIconName : 'menu1Icon'},
        {name : 'menu2', disabled : false, mdlIconName : 'menu2Icon'},
        {name : 'menu3', disabled : false, mdlIconName : 'menuIcon'}
      ];
      renderedMdlMenu = TestUtils.renderIntoDocument(<MdlMenu menuId="testMenu" menus={Menus} />);
      // let  menuItems  = TestUtils.scryRenderedDOMComponentsWithTag(renderedMdlMenu, 'li');
      // expect(menuItems.length).to.equal(3);
    }); 
  });  

});
