var React = require('react');
var Sortable = require('react-sortable');

console.log(Sortable);

var SortableListItem = React.createClass({
    mixins: [Sortable],
    render: function() {
        return this.transferPropsTo(
            <li>{this.props.item}</li>
        );
    }
});

var App = React.createClass({

    getDefaultProps(){
        return {
            data: {
                items: [
                    "Gold",
                    "Crimson",
                    "Hotpink",
                    "Blueviolet",
                    "Cornflowerblue",
                    "Skyblue",
                    "Lightblue",
                    "Aquamarine",
                    "Burlywood"
                ]
            }
        }
    },

    getInitialState: function() {
        return {data: this.props.data};
    },

    sort: function(items, dragging) {
        var data = this.state.data;
        data.items = items;
        data.dragging = dragging;
        this.setState({data: data});
    },

    render: function() {

        var listItems = this.state.data.items.map(function(item, i) {
            return (
                <SortableListItem
                    sort={this.sort}
                    data={this.state.data}
                    key={i}
                    item={item} />
            );
        }, this);

        return <ul>{listItems}</ul>
    }
});

module.exports = App;