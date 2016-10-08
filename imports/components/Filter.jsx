import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = this.props.item;
        this.state = {
            className: this.props.className
        }
    }
    render() {
        return (
        	<div
        		onClick={this.props.onClick}
                className={this.state.className} 
                data-type="tag">
                {this.props.item}
            </div>
        )
    }
}

export default Filter;
