import { LightningElement ,api} from "lwc";
import { NavigationMixin } from 'lightning/navigation'
import { deleteRecord } from "lightning/uiRecordApi";
export default class TrpDragAndDropChildCard extends NavigationMixin(LightningElement) {

    @api stage;
    @api record;
    showModal=false;
    objectApiName='Opportunity';
    mode='view';
    get isSameStage(){
        return this.stage===this.record.StageName
    }
    navigationOppHandler(event){
        event.preventDefault();
        this.navigateToTheRecord(event.target.dataset.id,'Opportunity');
    }
    navigationAccHandler(event){
        event.preventDefault();
        this.navigateToTheRecord(event.target.dataset.id,'Account');
    }
    recordPageUrl;
    navigateToTheRecord(Id,apiName){
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId:Id,
                objectApiName:apiName,
                actionName:'view',
            },
        }).then((url) => {
            this.recordPageUrl = url;
            window.open(this.recordPageUrl, "_blank");
        });
    }

    itemDragStart(){
        try{
            const event=new CustomEvent('itemdrag',{
                detail:this.record.id
            }) 
            this.dispatchEvent(event)
        }
        catch(error){
            console.error(error);
        }   
    }



    openMenuItems(event){
            this.refs.open.classList.toggle('slds-is-open');
            let classList=this.refs.open.classList;
            window.setTimeout(()=>{
                if(classList.contains('slds-is-open')){
                    this.refs.open.classList.remove('slds-is-open');
                }
            },5000)
    }
    
    editRecord(event){
        event.preventDefault();
        this.showModal=true;
        this.mode='edit';

    }
    viewRecord(event){
        event.preventDefault();
        this.showModal=true;
        this.mode='readonly';
    }
    deleteRecord(event){
        event.preventDefault();
        
        deleteRecord(this.record.id).then((result)=>{
            console.log(`deleted successfully`);
        })
        .catch(error=>{
            console.log(`deleted error`);
        })
    }

    closeModal(){
        this.showModal=false;
    }
    handleSuccess(){
        this.closeModal();
    }
} 