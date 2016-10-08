import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import CollectionList from './imports/components/CollectionList.jsx';
 
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
        render(
            Component, Component.props.target[0]
        );
    };
  }
}

//Compile the app build from imports or other various methods 
class App_Build {
    constructor() {
        const target = $("#render-target");
        const url = $(target).data("url");
        const category = $(target).data("category");

        if(target.length > 0){
            //add loader
            $(target).append("<div class='loader-wrapper'><div class='loader'></div></div>");

            //get the data from the url
            const request = this.getPageData(url + "?category=" + category);

            $.when(request).done((data) => {
                const fellowsList = new Module(
                    <CollectionList data={data} category={category} target={target}/>
                );

            });           
        }
    }
    getPageData(url){
        return $.ajax({
            url: url,
            data: {
                format: "json"
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


