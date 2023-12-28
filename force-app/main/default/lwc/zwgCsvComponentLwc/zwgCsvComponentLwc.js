import { LightningElement,wire } from "lwc";
import fetchAccounts from "@salesforce/apex/csvController.fetchAccounts";
const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Website', fieldName: 'Website' ,type: 'url'},
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
];
export default class ZwgCsvComponentLwc extends LightningElement {

    accoundData=[];
    columns=COLUMNS
    @wire(fetchAccounts)
    wiredAccounts({data, error}){
        if(data)
        {
            this.accoundData=data;
        }
        if(error){
            console.error(error);
        }
    }

    get checkRecord(){
        this.accoundData.length >0 ? false :true
    }

    downloadCsv(){
        let selectedRows=[];
        let dowloadRecords=[];
        selectedRows= this.template.querySelector("lightning-datatable").getSelectedRows();
        console.log(JSON.stringify(selectedRows));
        if(selectedRows.length>0){
            dowloadRecords=[...selectedRows];
        }
        else{
            dowloadRecords=[...this.accoundData];
        }

        let csvFile=this.convertArrayToCsv(dowloadRecords)  
        
        this.createLinkForDownload(csvFile);
    }

    convertArrayToCsv(dowloadRecords){
        let csvHeader=Object.keys(dowloadRecords[0]).toString();

        console.log(dowloadRecords);
        console.log(JSON.stringify(dowloadRecords));
        console.log(csvHeader);
        let csvBody=dowloadRecords.map((currItem)=>Object.values(currItem).toString());

        let csvfile=csvHeader+'\n' +csvBody.join("\n");
        return csvfile;
    }

    createLinkForDownload(csvFile){
        const downLink=document.createElement("a");
        downLink.href="data:text/csv;charset=utf-8,"+encodeURI(csvFile);
        downLink.target="_blank";
        downLink.download='Accountzwg_data.csv';
        downLink.click();
    }
}