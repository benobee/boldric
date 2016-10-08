import React from 'react';
import ReactDOM from 'react-dom';
import Price from './Price.jsx';

class CollectionItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = this.props.item.name;
        this.state = {
            className : "item"
        }
    }
    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            this.setState({className: "item active"});
        }, 200);             
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
    render() {   
        const imageArray = this.props.item.images.map((item, index) => {

            const divStyle = {
                backgroundImage: 'url(' + item.assetUrl + ')'
            }

            return (
                <div className="image" key={index} style={divStyle}></div>
            )
        });

        const images = imageArray.slice(0,2);
        
        return (

            <div className={this.state.className}
                data-url={this.props.item.fullUrl}
                data-class={this.props.item.tag}
                data-region={this.props.item.category}>

                <div className="item-content">
                    <div className="item-thumbnail-wrapper">
                        {images}
                    </div>
                    {this.showNoStock()}
                </div>
                <div className="header">
                    <div className="title">{this.props.item.name}</div>
                    <Price price={this.props.item.price}/>
                </div>                
            </div> 
        )
    }
}

export default CollectionItem;