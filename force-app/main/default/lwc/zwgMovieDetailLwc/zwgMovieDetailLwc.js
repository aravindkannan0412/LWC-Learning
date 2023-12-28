import { LightningElement, api,wire } from "lwc";

import {
    APPLICATION_SCOPE,
    MessageContext,
    subscribe,
    unsubscribe,
} from 'lightning/messageService';

import MOVIESEARCH from '@salesforce/messageChannel/MovieSearch__c'
export default class ZwgMovieDetailLwc extends LightningElement {

    subscriber
    movieId
    movieDetails
    loadComponent=false

    @wire(MessageContext)
    contextMessage

    connectedCallback(){
        this.subscriber=subscribe(  this.contextMessage,
            MOVIESEARCH,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE })
    
            
    }

    async getMovieDetails(imdbId){
        const APIKEY='815e9c98'
        const url=`https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${APIKEY}`

        const res=await fetch(url);
        const data=await res.json();
        this.loadComponent=true;
        console.log('selected movie data',data);
        this.movieDetails=data;
    }

    disconnectedCallback(){
        unsubscribe(this.subscriber)
        this.subscriber=null;
    }

    handleMessage(message){
        this.movieId=message.movieselected;
        console.log(this.movieId);
        this.getMovieDetails(this.movieId);
    
    }
}