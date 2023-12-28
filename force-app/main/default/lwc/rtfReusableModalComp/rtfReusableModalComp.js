import { LightningElement } from 'lwc';

export default class RtfReusableModalComp extends LightningElement {

    closeModalInParent(){

        const evt=new CustomEvent('closemodal')

        this.dispatchEvent(evt);
    }

    handleFooter(){

        const footer=this.template.querySelector('.slds-modal__footer')

        if(footer){
            footer.classList.remove('slds-hide');

        }
    }

    handleHeader(){
        const header=this.template.querySelector('.slds-modal__header')

        if(header){
            footer.classList.remove('remove_header');

        }
    }
}