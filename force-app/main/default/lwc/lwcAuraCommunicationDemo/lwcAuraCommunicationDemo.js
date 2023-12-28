import { LightningElement,api } from 'lwc';

export default class LwcAuraCommunicationDemo extends LightningElement {

    @api title

    callAura(){
        const cstEvent= new CustomEvent('sendmsg',{
            detail:{
                "msg":"hello from LWC"
            }
        })

        this.dispatchEvent(cstEvent);
    }
}