import { LightningElement, api } from "lwc";
export default class RefsDemoLwcNewFeature extends LightningElement {
	@api recordId;
	@api objectApiName;

    //ref is way to query a dom element

    submitHandler(){
        console.log(this.refs.nameRef);
       const name= this.refs.nameRef.value
       const age= this.refs.ageRef.value
       console.log("nameVal",name);
       console.log("ageVal",age);

       this.refs.responseRef.innerHTML=`<p> submitted Name is ${name} and Age is ${age} </p>`
       //if the template contains lwc:ref duplicate directive , takes the last directive
    }

   
}