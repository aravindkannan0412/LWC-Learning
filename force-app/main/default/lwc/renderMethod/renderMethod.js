import { LightningElement } from 'lwc';
import signupTemplate from './singupTemplate.html'
import signinTemplate from './signinTemplate.html'
import renderTemplate from './renderMethod.html'

export default class RenderMethod extends LightningElement {

    selectedBtn='';

    render(){
        return this.selectedBtn=== 'signup'?signupTemplate: 
        this.selectedBtn==='signin'?signinTemplate:
        renderTemplate
    }

    handleClick(event){
        this.selectedBtn=event.target.label;
    }

    submitHandler(event){
        console.log(`${event.target.label} Succesfully`);
    }
}