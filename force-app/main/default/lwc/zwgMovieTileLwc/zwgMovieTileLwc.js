import { LightningElement,api } from "lwc";
export default class ZwgMovieTileLwc extends LightningElement {

    @api movieTile
    @api selectedMovieId;
    clickHandler(event){
        this.dispatchEvent(new CustomEvent('selectedmovie',{
            detail:this.movieTile.imdbID,
        }))
    }

    get tileSelected(){
        return this.selectedMovieId=== this.movieTile.imdbID? 'title selected' : 'tile';
    }
}