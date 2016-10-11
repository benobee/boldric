import React from 'react';
import Filter_Item from './Filter_Item.jsx';
import _ from "underscore";

class Filter_List extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = this.props.name;
        this.state = {
        	activeFilter : "",
        	filterMenuClassName: "items"
        }
    }
    toggleMobileMenu() {
        const currentState = this.state.filterMenuClassName;

        if (currentState == "items") {
            this.setState({filterMenuClassName: "items visible"});           
        } else {
             this.setState({filterMenuClassName: "items"});
        }

    }
    convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
    }
    setFilters(e) {
        this.setState({filterMenuClassName: "items"});

        const filterName = e.currentTarget.getAttribute("data-name");
        
        const type = e.currentTarget.getAttribute("data-type");

        this.setUIStatus(type, filterName);
        this.setSearchFilter(type, filterName);
    }
    setUIStatus(type, filterName){
        //remove active class for item animation on mount
        const clearActiveFilters = _.where(this.refs, {filterType: type});

        _.each(clearActiveFilters, (i) => {
            i.setState({className: "item"});
        });

        const setActiveFilter = _.where(this.refs, {displayName: filterName, filterType: type});

        setActiveFilter['0'].setState({className: "item active", active: true});      
    }
    setSearchFilter(type, filterName){
        //create filter object
        this.setState({activeFilter: filterName});

        //get master collection and set state filter
        const collection = this.props.collection;

        if(type == "category") {
            delete collection.tag;
            collection.setState({filterUpdated : filterName});
        } 

        if(filterName == "All") {
            collection[this.props.type] = undefined;
            collection.setState({filterUpdated : filterName});

        } else {
            collection[this.props.type] = filterName;
            collection.setState({filterUpdated : filterName});
        }
    }
    render() {
    	const tags = this.props.tags;

        const items = tags.map( (item, index) => {
            if(item !== "undefined") {
                return(
                    <Filter_Item key={[item]}
                        onClick={this.setFilters.bind(this)}
                        ref={[item]}
                        className={"item"}
                        data-type={this.props.type}
                        item={item} />
                )
            }
        });
        return(
            <div className="filter-group">
                <div className="desktop header"><i className={this.props.icon} aria-hidden="true"></i> {this.props.name}</div>
                <div className="mobile header" onClick={this.toggleMobileMenu.bind(this)}><i className={this.props.icon} aria-hidden="true"></i> {this.props.name}</div>
                <div className={this.state.filterMenuClassName}>  
                    <Filter_Item ref={"All"} className={"tag item active"} onClick={this.setFilters.bind(this)} item={"All"} data-type={this.props.type} />
                    {items}
                </div>
                
            </div>
        )
    }
}

export default Filter_List;
