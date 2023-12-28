import { LightningElement,api,wire } from "lwc";
import { createRecord,updateRecord,deleteRecord } from "lightning/uiRecordApi";
import TASKMANAGER from '@salesforce/schema/Task_Manager__c'
import TASKNAME from '@salesforce/schema/Task_Manager__c.Name'
import TASKDATE from '@salesforce/schema/Task_Manager__c.Task_Date__c'
import TASKCOMPLETEDDATE from '@salesforce/schema/Task_Manager__c.Completed_Date__c'
import ISCOMPLETED from '@salesforce/schema/Task_Manager__c.isCompleted__c'
import TASKID from '@salesforce/schema/Task_Manager__c.Id'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import loadAllCompleteRecords  from "@salesforce/apex/zwgToDoController.loadAllCompleteRecords";

import loadAllIncompleteRecords from "@salesforce/apex/zwgToDoController.loadAllIncompleteRecords";

import {refreshApex} from '@salesforce/apex'
export default class ZwgToDoAppLwc extends LightningElement {
  
    //binding properties
    taskName="";
    taskDate=null;
    incompleteTask=[];
    completedTask=[];
    incompleteTaskResult;
    completeTaskResult;
    //Binding and Reset
    changeHandler(event){
        const {name,value}=event.target;

        if(name==="taskname"){
            this.taskName=value; 
        }
        else if(name==="taskdate"){
            this.taskDate=value;
        }
    }

    resetHandler(){
        this.taskName="";
        this.taskDate=null;
    }

    //add button to create Tasks
    addTaskHandler(event){
        if(!this.taskDate){
            this.taskDate =new Date().toISOString().slice(0,10);

            console.log(new Date().toISOString());
        }
        if(this.validateTasks()){
            this.createTaskManagerRecords();
        } 
    }

    validateTasks(){
       
        let isValid=true;
        let taskElement=this.refs.taskname;
        if(!this.taskName){
            isValid=false;
        }
        else{
            let taskItem=this.incompleteTask.find(curritem =>{ 
                return curritem.taskname===this.taskName && curritem.taskdate===this.taskDate
            })
            console.log(taskItem);

            if(taskItem){
                isValid=false;
                console.log(this.refs.taskname);
                taskElement.setCustomValidity("Task is already available")
            }
        }

        if(isValid){
            taskElement.setCustomValidity("")
        }

        taskElement.reportValidity();
        return isValid
    }

    createTaskManagerRecords(){
        let inputFields={};
        inputFields[TASKNAME.fieldApiName]=this.taskName;
        inputFields[TASKDATE.fieldApiName]=this.taskDate;
        const recordInput={
            apiName:TASKMANAGER.objectApiName,
            fields:inputFields
        }
        createRecord(recordInput).then((result)=>{
            this.showToastHandler("Task Creation",`Record created Successfully ${result.id}`,"success","pester");

            this.resetHandler();

            refreshApex(this.incompleteTaskResult);//passing property of wire method

        })
        .catch((error)=>{
            this.showToastHandler("Task Creation",`Record creation Failed \n ${error.body.message}`,"error","dismissable")
        })
    }

    removalHandler(event){
        let recordId=event.target.name;

        deleteRecord(recordId).then((result)=>{
            this.showToastHandler("Task Deletion",`Task Id ${recordId} is Deleted`,"success","dismissable");
            refreshApex(this.incompleteTaskResult);
        }).catch((error)=>{
            this.showToastHandler("Task Deletion",`Record Deletion Failed \n ${error.body.message}`,"error","dismissable")
        })
        
    }

    completeHandler(event){
        let recordId=event.target.name;
        this.refreshData(recordId);
    }

    dragStartHandler(event){
        event.dataTransfer.setData("recordId",event.target.dataset.item);
    }

    allowDrop(event){
        event.preventDefault();
    }

    dropElementHandler(event){
       let recordId= event.dataTransfer.getData("recordId");
       this.refreshData(recordId);
    }

    async refreshData(recordId){
        let inputFields={};
        inputFields[TASKID.fieldApiName]=recordId;
        inputFields[ISCOMPLETED.fieldApiName]=true;
        inputFields[TASKCOMPLETEDDATE.fieldApiName]=new Date().toISOString().slice(0,10);

        try{
            await updateRecord({fields:inputFields});
            await refreshApex(this.completeTaskResult);
            await refreshApex(this.incompleteTaskResult);
            this.showToastHandler("Task Update",`Record updated Successfully`,'success')
        }
        catch(error){
            this.showToastHandler("Task Update",`Record updated Failed`,'error')
        }
    }

    //showToast
    showToastHandler(title,message,variant,mode){
        this.dispatchEvent(new ShowToastEvent({
            title,message,variant,mode
        }))
    }



    @wire(loadAllCompleteRecords)
    getCompletedRecords(result){
    this.completeTaskResult=result;
    let {data,error}=result;
    if(data){
        this.completedTask=data.map((currItem)=>({
            taskId:currItem.Id,
            taskname:currItem.Name,
            taskdate:currItem.Completed_Date__c,
        }));
    }
    if(error){
        console.error(error);
    }
    }

    @wire(loadAllIncompleteRecords)
    getIncompleteRecords(result){
    this.incompleteTaskResult=result;
    let {data,error}=result;
    if(data){
        this.incompleteTask=data.map((currItem)=>({
            taskId:currItem.Id,
            taskname:currItem.Name,
            taskdate:currItem.Task_Date__c,
        }));
    }
    if(error){
        console.error(error);
    }
    }

//    sortTask(inputArr){

//     let sortedArray= inputArr.sort((a,b)=>{
//          const dateA=new Date(a.taskdate);
//          const dateB=new Date(b.taskdate);

//          return dateA-dateB;
//      })

//      return sortedArray;
//    }

}