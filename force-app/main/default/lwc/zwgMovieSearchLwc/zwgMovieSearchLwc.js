import { LightningElement ,wire} from "lwc";
import {
    MessageContext,
    publish,
} from 'lightning/messageService';

import MOVIESEARCH from '@salesforce/messageChannel/MovieSearch__c'
const Delay=1000;
export default class ZwgMovieSearchLwc extends LightningElement {
    timer
    selectedType="";
    loading=false;
    selectedSearch="";
    selectedPageNo="1";
    searchResult=[];
    selectedMovie='';

    @wire(MessageContext)
    contextMessage

    get typeoptions() {
        return [
            { label: 'Movie', value: 'movie' },
            { label: 'Tv-Shows/Series', value: 'series' },
            { label: 'Episodes', value: 'episode' },
            { label: 'None', value: '' },
        ];
    }

    handleInputChange(event) {
        let {name,value} = event.target;

        if(name==="type"){
            this.selectedType=value
        }
        else if(name==="search"){
            this.loading=true;
            this.selectedSearch=value
        }
        else if(name=="pageNo"){
            this.selectedPageNo=value
        }
        if(this.selectedSearch){
            window.clearTimeout(this.timer);

            this.timer= setTimeout(()=>{
                this.searchMovie();
            },Delay)
        }
        
        
    }


    //this method will search for the moveis
    async searchMovie(){
        const APIKEY='815e9c98'
        const url=`https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=${APIKEY}`;

        const res=await fetch(url); //returns a promise so neeed to use async await

        const data=await res.json();

        
        console.log('movie data',data);
        this.loading=false;

        if(data.Response==="True"){
            this.searchResult=data.Search;
        }
    }

    movieSelectedHandler(event){
      this.selectedMovie=event.detail   
      console.log('movieid',this.selectedMovie);
      const payload={movieselected:this.selectedMovie}
      publish(this.contextMessage,MOVIESEARCH,payload)
    }
}

// https://dream-dream-9281-dev-ed.scratch.my.site.com/movieSearch