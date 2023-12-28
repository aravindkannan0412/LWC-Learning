public with sharing class rtfchartOpportunityController {


    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(){
        return [select Id,StageName from Opportunity];
    }
}