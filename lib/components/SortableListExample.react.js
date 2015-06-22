var React = require('react');
var Collection = require('./Collection.react');
var SortableMixin = require('sortablejs/react-sortable-mixin');

var Item = React.createClass({
    render(){
        return <li data-id={this.props.id}>{this.props.name}</li>
    }
})

module.exports = React.createClass({

    getDefaultProps(){
        return {
            data:[
                {id:0, name:"Item 1", position:0},
                {id:1, name:"Item 2", position:1},
                {id:2, name:"Item 3", position:2},
                {id:3, name:"Item 4", position:3},
                {id:4, name:"Item 5", position:4}
            ]
        }
    },

    render(){
        return (
            <Collection data={this.props.data} sortableOptions={{disabled:false}}>
                <Item/>
            </Collection>
        )
    }
});