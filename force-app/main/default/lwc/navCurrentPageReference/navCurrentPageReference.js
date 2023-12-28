import { LightningElement,wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation'
export default class NavCurrentPageReference extends LightningElement {
    @wire(CurrentPageReference)
    pageRef

    get currentPgeReference(){
        return this.pageRef?JSON.stringify(this.pageRef,null,2):''
    }
}