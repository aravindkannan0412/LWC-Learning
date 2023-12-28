import { LightningElement } from 'lwc';

export default class ShadowDomStyling extends LightningElement {
    isLoaded=false
    renderedCallback(){
        if(this.isLoaded) return
        const style=document.createElement('style');

        style.innerText=`c-shadow-dom-stylig .slds-button{
            background-color:red;
            color:white;
        }`

        this.template.querySelector('lightning-button').appendChild(style);
        this.isLoaded=true
    }
}