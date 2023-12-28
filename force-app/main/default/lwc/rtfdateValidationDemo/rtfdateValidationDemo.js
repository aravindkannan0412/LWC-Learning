import { LightningElement } from 'lwc';

export default class RtfdateValidationDemo extends LightningElement {

    startDate
    endDate
    isDisable=true
    error
    dateHandler(event){
        const {name,value}=event.target
        this[name]=value;
        if(this.startDate && this.endDate){
            this.isDisable=false
        }
    }
    submitHandler(){

        if(!this.validateDate(this.startDate,this.endDate)){
            this.error=`End date ${this.endDate} cannot be greater than the start date ${this.startDate}`
        }
        else{
            console.log(`valid`);
        }
    }

    validateDate(sDate,eDate){
        return new Date(sDate).getTime() < new Date(eDate).getTime()
    }
}