import { LightningElement,wire } from 'lwc';
import Id from '@salesforce/user/Id'
import {getRecord} from 'lightning/uiRecordApi'
import NAME_FIELD from '@salesforce/schema/User.Name'
import EMAIL_FIELD from '@salesforce/schema/User.Email'
const fields=[NAME_FIELD,EMAIL_FIELD]
export default class WireDemoUserDetail extends LightningElement {
    userId=Id
   // response;
    userDetail
    //syntax
    //@wire(adapter,adapterConfig)
    //propertyorFunction

    @wire(getRecord, 
        {recordId:'$userId',fields}
    )userDetailHandler({data,error}){
        // console.log(response);
        // this.response=JSON.stringify(response);
        //either we can user response or salesforce provided a hardcoded destructuring with data and error

        if(data){
            this.userDetail=data.fields;
        }
        if(error){
            console.error(error);
        }
    }
    //'$userId'-using dollar sign to make it reactive ,once the datacomes it executes or renderes
    @wire(getRecord, 
        {recordId:'0051m000006Jx1GAAS',
        fields:['User.Name','User.Email']
        }
    )userDetailProperty
}