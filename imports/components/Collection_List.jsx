//react core
import React from 'react';
import { render } from 'react-dom';
import Masonry from 'react-masonry-component';

//components
import Collection_Item from './Collection_Item.jsx';
import Filter_List from './Filter_List.jsx';

//libraries
import _ from 'underscore';

class Collection_List extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Collection_List';
        this.state = {
            filterMenuClassName : "items",
            categoryArray : this.processArray(this.props.data.items)
        }
        this.fullArray = this.processArray(this.props.data.items);    
    }
    formatPrice(value) {
        if(value !== undefined)
          //add decimal points to price
          return (this.props.price / 100).toFixed(2);
    }
    processArray(array) {
        return _.map(array, (i) => {
            
                const category = _.first(i.categories);

                const tag = _.first(i.tags);

                const store = {};

                if (i.variants) {
                    store.price = i.variants[0].price;
                    store.stock = i.variants[0].qtyInStock;
                }

                const obj = {
                    name: i.title,
                    images: i.items,
                    category: category,
                    tag: tag,
                    fullUrl: i.fullUrl,
                    body: i.body,
                    issueArea: i.excerpt,
                    price: store.price,
                    qtyInStock: store.stock
                }

                return obj;
        });
    }
    renderCategories() {

        let filterMethods = {
            subnav : false
        };

        if (this.props.data.categoryFilter == undefined) {
            filterMethods.subnav = true;
        }

        if (filterMethods.subnav) {
            const categories = this.props.data.collection.categories;

            return <Filter_List tags={categories} icon={"fa fa-tags"} collection={this} type={"category"} name={"categories"} ref={"Category Filters"} />

        }
    }
    renderTags(category) {
        let array = [];

        if(category == undefined){
            array = this.fullArray;
        } else {
            array = _.where(this.fullArray, {category : category});          
        }

        array = _.groupBy(array, "tag");
        array = _.allKeys(array);

        if(array.length > 1) {
            return <Filter_List tags={array} icon={"fa fa-filter"} collection={this} type={"tag"} name={"filters"} ref={"Tag Filters"} />
        }
    }
    renderResults(results) {
        if(results.length == 0){
            return <div><h2>No Results</h2></div>; 
        }
        return results.map(( item, index ) => {

            return(
                <Collection_Item ref={item.name} item={item} key={[item.name + '_' + index]} />
            );
        });     
    }
    renderHeader() {
        if(this.props.category !== undefined){
            return(
                <div className="category">
                    <div className="header">{this.props.category}</div>             
                </div>
            )
        }
    }
    render() {
        let search = {};

        if (this.category !== undefined) {
            search.category = this.category;
        } 

        if (this.tag !== undefined) {
            search.tag = this.tag;
        }

        const results = _.where(this.fullArray, search);

        const masonryOptions = {
            transitionDuration: 300
        };

        return(
            <div className="module-container">
                {this.renderHeader()}
                <div className="filters">

                    {this.renderCategories()}
                    {this.renderTags(this.category)}

                </div>
                <Masonry
                    ref={"collection_list"}
                    className={'collection-list'} // default '' 
                    elementType={'div'} // default 'div' 
                    options={masonryOptions} // default {} 
                    disableImagesLoaded={false} // default false 
                    updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false 
                >
                    {this.renderResults(results)}
                </Masonry>                      
            </div>
        )
    }
}

export default Collection_List;