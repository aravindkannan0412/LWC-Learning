import { LightningElement,api } from 'lwc';

export default class ConfigLWCDemo extends LightningElement {

    @api heading
    @api recordId
    @api levels
    @api  age
}