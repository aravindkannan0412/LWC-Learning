import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class NavNavigateToWebPage extends NavigationMixin(LightningElement) {
    @api recordId;
}