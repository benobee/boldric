import React from 'react';
import ReactDOM from 'react-dom';
import Price from './Price.jsx';

class CollectionItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = this.props.item.name;
        this.state = {
            dislayName: this.props.item.name,
            className : "item"
        }
    }
    componentWillReceiveProps(nextProps) {
        this.displayName = nextProps.item.name;
        setTimeout(() => {
            this.setState({className: "item active"});
        }, 300);
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({className: "item active"});
        }, 400);
    }
    showNoStock(){
        const stock = this.props.item.qtyInStock;

        if(stock == 0){
            return <div className="no-stock">Sold Out</div>
        }
    }
    navigateToPage(){
        window.location.pathname = this.props.item.fullUrl;
    }
    render() {
        let productItem = {
            className : "item-thumbnail-wrapper"
        };

        if (this.props.item.images.length > 1){
            productItem.hasSecondImage = true;
        }

        if (productItem.hasSecondImage) {
            productItem.className = "item-thumbnail-wrapper has-second-image";
        }

        const imageArray = this.props.item.images.map((item, index) => {

            const divStyle = {
                backgroundImage: 'url(' + item.assetUrl + ')'
            }

            return (
                <div className="image" key={[item.id + "_" + index]} style={divStyle}></div>
            )
        });

        const images = imageArray.slice(0,2);
        
        return (

            <a href={this.props.item.fullUrl} className={this.state.className}
                data-url={this.props.item.fullUrl}
                data-class={this.props.item.tag}
                data-region={this.props.item.category}>

                <div className="item-content">
                    <div className={productItem.className}>
                        {images}
                    </div>
                    {this.showNoStock()}
                </div>
                <div className="header">
                    <div className="title">{this.props.item.name}</div>
                    <Price price={this.props.item.price}/>
                </div>                
            </a> 
        )
    }
}

export default CollectionItem;