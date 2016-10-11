import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Collection_List from './imports/components/Collection_List.jsx';
import ReactDOMServer from 'react-dom/server';
 
const css = require("./main.less");

//create module from app build init 
//which renders to DOM 
class Module {
  constructor(Component) {
        this.Component = Component;
        this.element = Component.props.target;

        //React render to DOM
        this.renderToDOM(Component);
  }
  renderToDOM(Component) {
    if (Component.props.target.length > 0) {
        ReactDOM.render(
            Component, Component.props.target[0]
        );
    };
  }
}

//Compile the app build from imports or other various methods 
class App_Build {
    constructor() {
        this.productCategoryPages();
    }
    productCategoryPages(){
        let category = {};

        const target = $("#render-target");
        const url = $(target).data("url");

        category.name = $(target).data("category");

        if( category.name !== undefined) {
           category.url = encodeURIComponent( $(target).data("category") );
        }

        if (target.length > 0) {
            //add loader
            $(target).append("<div class='loader-wrapper'><div class='loader'></div></div>");

            //get the data from the url
            const request = this.getPageData(url, category.name);

            $.when(request).done((data) => {

                const fellowsList = new Module(
                    <Collection_List data={data} category={category.name} target={target}/>
                );

                // const component = ReactDOMServer.renderToStaticMarkup(<Collection_List data={data} category={category.name} target={target}/>);

                // const html = {__html: component};

                // ReactDOM.render(
                //     <div dangerousSetInnerHTML={html}, target[0] />
                // );
            });           
        }        
    }   
    getPageData(url, categoryName) {

        return $.ajax({
            url: url,
            data: {
                format: "json",
                category: categoryName
            },
            dataType: "jsonp",
            success: (result) => {
                return result;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
};


const App = new App_Build();

window.Boldric_App_Build = new App_Build();





