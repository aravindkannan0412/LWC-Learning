import { LightningElement,api } from 'lwc';
import CAR_HUB_LOGO from "@salesforce/contentAssetUrl/CAR_HUB_LOGO";
export default class CarhubPlaceHolder extends LightningElement {

    @api message

    carAsset=CAR_HUB_LOGO
}