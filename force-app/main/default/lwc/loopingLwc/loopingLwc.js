import { LightningElement } from 'lwc';

export default class LoopingLwc extends LightningElement {

    carList=["ford","benz","bmw","audi","hyundai","Volkswogan"];

    ceoList=[
        {
            id:1,
            company:"Google",
            name:"sundar pichai"
        },
        {
            id:2,
            company:"x-Google",
            name:"x-sundar pichai"
        },
        {
            id:3,
            company:"y-Google",
            name:"y-sundar pichai"
        },
        {
            id:4,
            company:"z-Google",
            name:"z-sundar pichai"
        },
        {
            id:5,
            company:"1-Google",
            name:"1-sundar pichai"
        },
    ];
}