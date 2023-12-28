import { LightningElement,wire } from "lwc";
import retrieveNews from "@salesforce/apex/trpNewsController.retrieveNews";
export default class TrpNewsComponentLwc extends LightningElement {

    result=[];
    selectedNews;
    isshowModal=false;

   connectedCallback(){
    this.fetchNews();
   }

   fetchNews(){
    retrieveNews().then((response)=>{
        console.log(response);
        this.formatNewData(response.articles);
    })
    .catch((error)=>{
        console.error(error);
    })

   }

   formatNewData(articles){
    this.result=articles.map((item,index)=>{
        let id=`new_${index+1}`;
        let date=new Date(item.publishedAt).toDateString()
        let name=item.source.name;
        return {...item,id:id,name:name,date:date}
    })
   }

   showModal(event){
    let newsId=event.target.dataset.item;

    this.result.forEach(item=>{
        if(item.id===newsId){
            this.selectedNews={...item};
        }
    })
    this.isshowModal=true
    }

    get modalClass(){
        return this.isshowModal ?"slds-modal slds-fade-in-open":"slds-modal"
    }

    get modalBacDropClass(){
        return this.isshowModal ?"slds-backdrop slds-backdrop_open":"slds-backdrop"
    }

    closeModal(){
        this.isshowModal=false;
    }
}