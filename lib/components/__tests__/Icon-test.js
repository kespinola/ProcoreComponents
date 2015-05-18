"use strict";
jest.dontMock('../Icon.react.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Icon = React.createFactory(require('../Icon.react.js'));
var _ = require('underscore');

var defaultProps = {
  icon: "delete",
  disabled: false,
  onClick: function() {}
};

var render = function(newProps) {
  var props = {};
  _.extend(props, defaultProps, newProps);
  return TestUtils.renderIntoDocument(
    Icon(props)
  );
};

describe('Icon', function() {

  it('invokes callback after click', function() {
    var mockCallback = jest.genMockFunction();
    var icon = render({onClick: mockCallback});
    TestUtils.Simulate.click(icon.refs.iTag);
    expect(mockCallback).toBeCalled();
  });

  it('has the disabled class if the disabled prop is true', function() {
    var icon = render({disabled: true});
    expect(icon.refs.iTag.getDOMNode().className).toContain('disabled');
  });

  it('does not have the disabled class if the disabled prop is false', function() {
    var icon = render({disabled: false});
    expect(icon.refs.iTag.getDOMNode().className).toNotContain('disabled');
  });

  it('has the correct className for "delete"', function() {
    var icon = render({icon: "delete"});
    expect(icon.refs.iTag.getDOMNode().className).toContain('fa-times');
  });
});
