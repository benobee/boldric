import React from 'react';
import { render } from 'react-dom';
import Masonry from 'react-masonry-component';

//components
import CollectionItem from './CollectionItem.jsx';
import Filter from './Filter.jsx';

//libraries
import _ from 'underscore';

const masonryOptions = {
    transitionDuration: 400
};

class CollectionList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'CollectionList';
        this.filter = {};
        this.state = {
            array: this.processArray(this.props.data.items),
            filter: ''
        }
        this.fullArray = this.processArray(this.props.data.items);
    }
    formatPrice(value){
        if(value !== undefined)
          //add decimal points to price
          return (this.props.price / 100).toFixed(2);
    }
    getTagsFromQuery(){
        let array = _.groupBy(this.fullArray, "tag");

        array = _.allKeys(array);

        return array;
    }
    processArray(array){
        return _.map(array, (i) => {
            
                const category = _.first(i.categories);

                const tag = _.first(i.tags);

                const obj = {
                    name: i.title,
                    images: i.items,
                    category: category,
                    tag: tag,
                    fullUrl: i.fullUrl,
                    body: i.body,
                    issueArea: i.excerpt,
                    price: i.variants[0].price,
                    qtyInStock: i.variants[0].qtyInStock
                }

                return obj;
        });
    }
    setFilters(e) {
            this.setState({filterClassNames: "tag item"});


            //set filter active filter class
            const filter = e.currentTarget.innerHTML;

            const clearActiveFilters = _.each(this.refs, (i) => {
                i.setState({className: "tag item"});
            });

            const activeFilter = _.where(this.refs, {displayName: filter});

            activeFilter['0'].setState({className: "tag item active"});

            const type = e.currentTarget.getAttribute("data-type");

            if (filter == "All"){
                delete this.filter[type];
            } else {
                this.filter[type] = filter;
            }

            this.runFilters();
            console.log(this);
    }
    runFilters() {
        const search = this.filter;
        const results = _.where(this.fullArray, search);
        
        this.setState({array: results});
    }
    renderTags(){
        const tags = this.getTagsFromQuery();

        if(tags[0] !== "undefined") {

            const items = tags.map( (item, index) => {

                return(
                    <Filter key={index}
                        ref={item}
                        onClick={this.setFilters.bind(this)} 
                        className={"tag item"}
                        data-type="tag"
                        item={item} />
                )
            });

            return(
                <div className="filters">
                    <div className="header"><i className="fa fa-filter" aria-hidden="true"></i> Sort By</div>
                    <div className="items">        
                        <Filter ref={["All"]} className={"tag item active"} onClick={this.setFilters.bind(this)} item={"All"} data-type="tag" />
                        {items}
                    </div>
                    <div className="category">{this.props.category}</div>
                </div>
            )
        }
    }
    renderResults(){
        if(this.state.array.length == 0){
            return <div><h2>No Results</h2></div>; 
        }
        return this.state.array.map(( item, index ) => {

            return(
                <CollectionItem ref={item.name} item={item} key={index} />
            );
        });     
    }
    render() {       
        return(
            <div className="module-container">
                {this.renderTags()}
                <Masonry
                    className={'collection-list'} // default '' 
                    elementType={'div'} // default 'div' 
                    options={masonryOptions} // default {} 
                    disableImagesLoaded={false} // default false 
                    updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false 
                >
                    {this.renderResults()}
                </Masonry>                      
            </div>
        )
    }
}

export default CollectionList;


