import { LightningElement,api } from "lwc";
export default class TrpDragAndDropLwcChild extends LightningElement {

    @api stage;
    @api records;

    @api resetTotalAmount(){
        this.totalOpportunityAmount;
    }
    
    get totalOpportunityAmount(){
        let total=0;
        if(this.records){
             total=this.records.filter(rec =>this.stage===rec.StageName).reduce((accumulator,currentValue)=>{
                console.log('currentValue',currentValue);
                return accumulator + currentValue.Amount;
            },0)
        }
        return total;
    }

    dragItemHandler(event){
        try{
            const evt=new CustomEvent('listitemdrag',{
                detail:event.detail
            }) 
            this.dispatchEvent(evt);
        }
        catch(error){
            console.error(error);
        }
    }

    handleDrop(event){
        try{
            const evt=new CustomEvent('itemdrop',{
                detail:this.stage  
            })
            this.dispatchEvent(evt)
        }
        catch(error){
            console.error(error);
        }
    }

    handleDragOver(event){
        try{
        event.preventDefault();
        }
        catch(error){
            console.error(error);
        }
    }

}