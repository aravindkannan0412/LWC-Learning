import { LightningElement } from 'lwc';
import hasViewAllData from '@salesforce/userPermission/ViewAllData'
import myCustomPermission from  '@salesforce/customPermission/show_Details'
export default class SrCheckPermissionScopeLWCDemo extends LightningElement {

    get hasViewAllData(){
        return hasViewAllData;
    }
    get hasCustomPermission(){
            return myCustomPermission;
    }
}