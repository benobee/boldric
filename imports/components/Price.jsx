import React from 'react';

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Price';
    }
    formatPrice(value){
        if(value !== undefined)
          //add decimal points to price
          return (this.props.price / 100).toFixed(2);
    }
    render() {
        const price = this.formatPrice(this.props.price);

        return (
            <div className="product-price">
                ${price}
            </div>
        )
    }
}

export default Price;