import { LightningElement } from 'lwc';

export default class NewConditionalDirectives extends LightningElement {
    showText = false
    get getLabel(){
        return this.showText ? 'Hide text' : 'Show Text'
    }
    showTextHandler(){
        this.showText = !this.showText
    }

    /****Getter demo */
    country = 'India'
    newcountry = 'Australia'
    get isCountryIndia(){
        console.log("isCountryIndia getter called")
        return this.country === "India"
    }
    get isCountryAustralia(){
        console.log("isCountryAustralia getter called")
        return this.newcountry === "Australia"
    }
    get isCountryCanada(){
        console.log("isCountryCanada getter called")
        return this.newcountry === "Canada"
    }

    
    changeHandler(event){
        this.country = event.target.value
    }
    changeHandler1(event){
        this.newcountry = event.target.value
    }
}