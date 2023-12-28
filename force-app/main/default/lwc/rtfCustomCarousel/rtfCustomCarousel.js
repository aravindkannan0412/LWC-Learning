import { LightningElement ,api} from 'lwc';

const CARD_VISIBLE_CLASSES='fade slds-show'
const CARD_HIDDEN_CLASSES='fade slds-hide'
const DOT_VISIBLE='dot active'
const DOT_HIDDEN='dot'
const DEFAULT_SLIDER_TIMER=3000
const DEFAULT_SLIDER_WIDTH=700
export default class RtfCustomCarousel extends LightningElement {
    slides=[];
    slideIndex=1;
    timer
    @api slideTimer=DEFAULT_SLIDER_TIMER;
    @api enableAutoScroll=false;
    @api customWidth=DEFAULT_SLIDER_WIDTH;
    @api showFull=false;

    get maxWidth(){
        return this.showFull ? `width:100%`:`width:${Number(this.customWidth)}px`
    }

    @api 
    get slidesData(){
        return this.slides;
    }

    set slidesData(data){
      this.slides= data.map((item,index)=>{

            return index===0?{
                ...item,slideIndex:index+1,
                cardClasses:CARD_VISIBLE_CLASSES,
                dotclases:DOT_VISIBLE,
            }:
            {
                ...item,slideIndex:index+1,
                cardClasses:CARD_HIDDEN_CLASSES,
                dotclases:DOT_HIDDEN,
            }
        })
    }


    connectedCallback(){
        if(this.enableAutoScroll){
            this.timer=window.setInterval(()=>{
                this.slideSelectionHandler(this.slideIndex+1)
            },Number(this.slideTimer))
        }
       
    }

    disconnectedCallback(){
        if(this.enableAutoScroll){
        window.clearInterval(this.timer);
        }
    }

    backSlide(){
        let slideIndex= this.slideIndex-1
        this.slideSelectionHandler(slideIndex)
    }

    forwardSlide(){
       let slideIndex= this.slideIndex+1
       this.slideSelectionHandler(slideIndex)
    }

    slideSelectionHandler(id){
        if(id>this.slides.length){
            this.slideIndex=1
        }
        else if(id < 1){
            this.slideIndex=this.slides.length
        }
        else{
            this.slideIndex=id
        }

        this.slides=this.slides.map((item)=>{
            return this.slideIndex===item.slideIndex ?{
                ...item,
                cardClasses:CARD_VISIBLE_CLASSES,
                dotclases:DOT_VISIBLE,
            }:
            {
                ...item,
                cardClasses:CARD_HIDDEN_CLASSES,
                dotclases:DOT_HIDDEN,
            }
        })
    }

    currentSlide(event){
        let slideIndex=Number(event.target.dataset.id)
        this.slideSelectionHandler(slideIndex)
    }
}