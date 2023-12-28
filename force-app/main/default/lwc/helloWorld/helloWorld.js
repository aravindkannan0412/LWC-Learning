import { LightningElement,track } from 'lwc';

export default class HelloWorld extends LightningElement {

    fullname="salesforce Learning";//local property used for binding
    title="LWC";    /*one way and two way data binding*/
    address2={
        city:"china",
        postcode:3008,
        country:'Australia'
    }
    @track address1={
        city:"Melborune",
        postcode:3008,
        country:'Australia'
    }
    address3={
        city:"newyork",
        postcode:3008,
        country:'Australia'
    }

    changeHandler(event){
        this.title=event.target.value;
    }
    /*track property vs normal */
    trackHandler2(event){
        this.address2.city=event.target.value;        
    }
    trackHandler1(event){
        this.address1.city=event.target.value;
    }
    trackHandler3(event){
        this.address3={...this.address3,"city":event.target.value};
        
    }

    /*getter demo */
    users=["aravind","kaveri"];
    num1=10000;
    num2=20000;
    get fetchUserName(){
        return this.users[0];
    }

    get totalSalary(){
        return this.num1+this.num2;
    }
}