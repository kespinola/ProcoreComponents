var React = require('react');
var Collection = require('./Collection.react');
var sortable = require('react-sortable-mixin');


var SortableItem = React.createClass({

    mixins:[sortable.ItemMixin],

    render(){
        return (
            <section>
                <h2 className="drag-handle">{this.props.id}</h2>
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
                    title:"Item 1"
                },
                {
                    id:1,
                    title:"Item 2"
                },
                {
                    id:2,
                    title:"Item 3"
                },
                {
                    id:3,
                    title:"Item 4"
                }
            ]
        }
    },

    _handleSort(args){
        console.log(args,'reorder from sort collection');
    },

    render(){
       return (
           <article>
               <h2>Sortable Collection Example</h2>
               <Collection data={this.state.items} sortable={true} onSort={this._handleSort} handle=".drag-handle">
                   <SortableItem />
               </Collection>
           </article>
       )
    }
});
module.exports = SortableListExample;