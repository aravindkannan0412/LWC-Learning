import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {

    closeHandler(){
        // without data
        // const myEvent=new CustomEvent('closemodal');
        //with data
         //const myEvent=new CustomEvent('closemodal',{detail:'Modal Closed Successfully'})
        //with bubbles:true
        const myEvent=new CustomEvent('closemodal',{bubbles:true,detail:'Modal Closed Successfully'})
        this.dispatchEvent(myEvent);
    }

    footerHandler(){
        console.log(`footer handler from child component`);
    }
}