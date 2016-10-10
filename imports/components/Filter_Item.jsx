import React from 'react';

class Filter_Item extends React.Component {
    constructor(props) {
        super(props);
        this.filterType = this.props['data-type'];
        this.displayName = this.props.item;
        this.state = {
            active: false,
            className: this.props.className
        }
    }
    componentWillReceiveProps(nextProps) {
        this.displayName = nextProps.item;     
    }
    render() {
        return (
        	<div
        		onClick={this.props.onClick}
                className={this.state.className}
                data-type={this.props['data-type']}
                data-name={this.props.item} >
                {this.props.item}
            </div>
        )
    }
}

export default Filter_Item;
