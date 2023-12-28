import { LightningElement,wire } from 'lwc';
import getcontactList from '@salesforce/apex/rtfContactController.getcontactList';
export default class RtfFilteringAndSortLWCDemo extends LightningElement {
    headings=["Id","Name","Title","Email"];
    fullTableData=[];
    filteredData=[];
    timer
    filterBy='Name'
    sortBy='Name'
    sortDirection='asc'
    @wire(getcontactList)
    contactHandler({data,error}){
        if(data){
            console.log(data);
            this.fullTableData=data;
            this.filteredData=data;
        }
        if(error){
           console.error(error);
        }
    }

    get FilterByOptions(){
        return [
            {label:"Id",value:'Id'},
            {label:"Name",value:'Name'},
            {label:"Title",value:'Title'},
            {label:"Email",value:'Email'},
            {label:"All",value:'All'},
        ]
    }

    get SortByOptions(){
        return [
            {label:"Id",value:'Id'},
            {label:"Name",value:'Name'},
            {label:"Title",value:'Title'},
            {label:"Email",value:'Email'},
        ]
    }

    filterbyHandler(event){
        this.filterBy=event.target.value
    }

    filterHandler(event){
        const {value}=event.target;
        window.clearTimeout(this.timer);

        console.log(value);
        if(value){
            this.timer=window.setTimeout(()=>{
                this.filteredData = this.fullTableData.filter(eachObj=>{
                    if(this.filterBy==='All'){
                        //Below Logic will filter each and every property of object
                        //Object.keys(eachObj)=["Id","Name","Title","Email"]
                        //some any one is there from the key become true
                        return Object.keys(eachObj).some(key=>{
                            return eachObj[key].toLowerCase().includes(value);
                        })
                    }
                    else{
                        const val=eachObj[this.filterBy]? eachObj[this.filterBy]:''
                        console.log(val);
                        return val.toLowerCase().includes(value);
                    }

                   
                })
            },1000)
           
        }
        else{
            this.filteredData=[...this.fullTableData];
        }
       
    }

    sortHandler(event){
        this.sortBy=event.target.value;
        this.filteredData=[...this.sortedBy(this.filteredData)];
    }

    sortedBy(data){

        const cloneData=[...data];
        cloneData.sort((a,b)=>{
            if(a[this.sortBy] === b[this.sortBy]){
                return 0
            }

            return this.sortDirection==='desc'?
            a[this.sortBy] > b[this.sortBy]? -1:1 :
            a[this.sortBy] < b[this.sortBy]? -1:1 
        })

        return cloneData
    }
}