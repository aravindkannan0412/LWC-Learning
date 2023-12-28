import { LightningElement,api } from 'lwc';

export default class P2cSliderComponent extends LightningElement {
    @api cardTitle
    val=20;
    changeHandler(event){
        this.val=event.target.value;
        console.log(`in change handler ${this.val}`);
    }

    @api resetSlider(){
        this.val=50;
        console.log(`in reset slider ${this.val}`);

    }
}