import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {

    constructor(){ //order 1
        // systax
        super()
        // this.template.query wont help as dom is not ready in this stage
        console.log('parent constructor called');
    }

    connectedCallback(){ //order 2
        console.log("Parent connected Callback called")
    }
    renderedCallback(){
        console.log(`Parent rendered Callaback called`);
    }
    name='';
    changeHandler(event){
        this.name=event.target.value
        console.log(this.name);
    }
    ischildVisible=false;
    handleClick(event){
        this.ischildVisible=!this.ischildVisible;
    }
    errorCallback(error,stack){
        console.log(error.message);
        console.log(stack);
    }
}