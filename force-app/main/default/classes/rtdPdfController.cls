public with sharing class rtdPdfController {
   
    @AuraEnabled
    public static Attachment genreatePDF(Id recordId,String htmlData){
        PageReference page=Page.rtfrenderAsPDF;
        page.getParameters().put('pdfText',htmlData);

        Contact con=new Contact(Id=recordId);
        Attachment objAttachment=new Attachment();
        objAttachment.Name='invoice.pdf';
        objAttachment.ParentId=con.Id;
        objAttachment.Body=page.getContentAsPDF();
        objAttachment.IsPrivate=false;

        insert objAttachment;
        return objAttachment;
    }
}