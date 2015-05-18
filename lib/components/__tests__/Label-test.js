"use strict";
jest.dontMock('../Label.react.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Label = React.createFactory(require('../Label.react.js'));
var _ = require('underscore');

var defaultProps = {
  item: {id: 1, name: "Procore"}
};

var render = function(newProps) {
  var props = {};
  _.extend(props, defaultProps, newProps);
  return TestUtils.renderIntoDocument(
    Label(props)
  );
};

describe('Label', function() {

  it('should return item.name on getName(item)', function() {
    var label = render();
    expect(label.getName(defaultProps.item)).toBe("Procore");
  });
  it('should render item.name (Procore) by default', function() {

    var label = render();
    expect(label.refs.title.getDOMNode().textContent).toBe("Procore");
  });

  it('should use the provided parseLabel method to parse the item', function() {
    var label = render({parseLabel: (item) => {return item.id + " - " + item.name;}});
    expect(label.refs.title.getDOMNode().textContent).toBe("1 - Procore");
  });
});
