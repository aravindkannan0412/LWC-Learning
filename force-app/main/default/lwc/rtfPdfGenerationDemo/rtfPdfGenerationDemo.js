import { LightningElement,api } from 'lwc';
import SPARK_SUITE from '@salesforce/resourceUrl/spark_suite'
import genreatePDF from '@salesforce/apex/rtdPdfController.genreatePDF';
export default class RtfPdfGenerationDemo extends LightningElement {

    @api recordId
    imageUrl=SPARK_SUITE;
    invoiceData={
        invoiceNo:'123xx',
        invoiceCreated:'January 1 2021',
        invoiceDue:'January 10 2022',
        companyName:'Spark suite, Inc.',
        address1:'12345 Sunny Road',
        address2:'Sunnyville, CA 12345'
    }

    clientData={
        client:'Acme Corp',
        username:'John Doe',
        email:'John@example.com'
    }

    services=[ 
            {name:'consultant fee',amount:1000.00},
            {name:'website design',amount:300.00},
            {name:'Hosting (3 months)',amount:75.00}
    ]

    get totalAmount(){
        return this.services.reduce((total,services)=>{
            return total=total+services.amount
        },0)
    }
    
    pdfHandler(event){
        let pdfMarkUp=this.template.querySelector('.container');
        console.log(pdfMarkUp.outerHTML);
        genreatePDF({recordId:this.recordId,htmlData:pdfMarkUp.outerHTML})
        .then(result=>{
            console.log("attachment id ",result);
            window.open(`https://app-customization-4054-dev-ed.scratch.file.force.com/servlet/servlet.FileDownload?file=${result.Id}`)
        })
        .catch(error=>{
            console.error(error);
        })
    }
    
}