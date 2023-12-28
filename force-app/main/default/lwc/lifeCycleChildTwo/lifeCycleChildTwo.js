import { LightningElement } from 'lwc';

export default class LifeCylceChild extends LightningElement {

    constructor(){ //order 1
        // systax
        super()
        // this.template.query wont help as dom is not ready in this stage
        console.log('child constructor called');
    }

    connectedCallback(){ //order 2
        console.log("child connected Callback called")
        throw new Error(`Loading of child component 2 failed`)
    }
    renderedCallback(){
        console.log(`child rendered Callaback called`);
    }
    disconnectedCallback(){
       alert(`remove the child component so its disconnected`);
    }
}