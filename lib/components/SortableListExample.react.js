var React = require('react');
var Collection = require('./Collection.react');
var Sortable = require('react-sortable-items');
var SortableItemMixin = require('react-sortable-items/SortableItemMixin');


var SortableItem = React.createClass({

    mixins:[SortableItemMixin],

    render(){
        return this.renderWithSortable(
            <section>
                <h2>{this.props.id}</h2>
                {this.props.title}
            </section>
        )
    }
});


var SortableListExample = React.createClass({
    getInitialState() {
        return {
            items: [
                {
                    id:0,
                    title:"Item 1",
                    position:0
                },
                {
                    id:1,
                    title:"Item 2",
                },
                {
                    id:2,
                    title:"Item 3",
                    position:2
                },
                {
                    id:3,
                    title:"Item 4"
                }
            ]
        }
    },

    _handleSort(reorder){
        console.log(reorder,'from example')
    },

    render(){
       return (
           <article>
               <h2>Sortable Collection Example</h2>
               <Collection data={this.state.items} sortable={true} onSort={this._handleSort}>
                   <SortableItem />
               </Collection>
           </article>
       )
    }
});
module.exports = SortableListExample;