public with sharing class rtfPdfPageController {
    
    public String pdfText{get;set;}
    
    public rtfPdfPageController() {

        pdfText=String.escapeSingleQuotes(
            ApexPages.currentPage().getParameters().get('pdfText')
        );
    }
}