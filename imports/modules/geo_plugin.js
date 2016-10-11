import $ from 'jquery';

class Module {
   constructor(){
       this.cacheDOM();
       this.init = this.init;
   }
   init(){
        if (window.location.hostname !== "aliloukzada.squarespace.com") {
            this.hideCanvas();
            this.getUserLocation();     
            this.checkUser();       
        }
   }
   cacheDOM(){
        this.body = $("body");
   }
   getUserLocation(){
        let geo;
   
        geo = geoplugin_countryName();
   
        if(geo !== undefined){     
          return geo;
        }
   }
   checkUser(){
        let geo;
   
        geo = this.getUserLocation();
  
        this.country = geo;
        
        if ( ( geo == "India" ) || ( geo == "China" ) || (geo == "Taiwan") || (geo == "Pakistan" ) || (geo == "Bangladesh") && ( geo !== undefined )){
      
           //clear html on body
           $(this.body).html("");
        } else {
           this.showCanvas();
        };
   }
   hideCanvas(){
        $(this.body).hide();
   }
   showCanvas(){
        $(this.body).show();
   }
 };

const geo_plugin_module = new Module();

export default geo_plugin_module;
