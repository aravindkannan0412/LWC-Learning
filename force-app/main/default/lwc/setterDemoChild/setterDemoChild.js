import { LightningElement,api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
    userDetail;
    @api
    get detail(){
        console.log('in getter');

        return this.userDetail
    }

    set detail(data){
        let newAge=data.age*2;
        this.userDetail={...data,age:newAge};
        console.log('in setter');
    }
}