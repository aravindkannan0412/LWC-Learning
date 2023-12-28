import { LightningElement } from 'lwc';
import MOMENT from '@salesforce/resourceUrl/moment';
import ANIMATE from '@salesforce/resourceUrl/animate';
import {loadScript,loadStyle} from 'lightning/platformResourceLoader'
export default class SrThirdPartyFilesLWCDemo extends LightningElement {
    currentDate='';
    isLibLoaded=false;
    renderedCallback(){
        console.log('loading');
        if(this.isLibLoaded){
            return;
        }
        Promise.all([
            loadStyle(this,ANIMATE+'/animate/animate.min.css'),
            loadScript(this,MOMENT+'/moment/moment.min.js')
        ]).then(()=>{
            console.log(`sucess`);
            this.setDateOnScreen();
        }).catch(error=>{
             console.error(error);
        })
        this.isLibLoaded=true;
//all promises to execute then method
       
    }

    setDateOnScreen(){
        this.currentDate=moment().format('LLLL');
    }
}