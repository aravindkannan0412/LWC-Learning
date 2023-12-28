import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {

    isVisisble=false;
    isNotVisisble=true;
    name='';

    handleClick(){
        this.isVisisble=true;
        this.isNotVisisble=false;
    }

    changeHandler(event){
        this.name=event.target.value;
    }

    get helloMethod(){
        return this.name==='hello';
    }

    //falsy value
    /*x=0,false,undefined,null,"" */
}