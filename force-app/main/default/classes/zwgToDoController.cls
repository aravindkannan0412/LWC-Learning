public with sharing class zwgToDoController {
   
    @AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> loadAllIncompleteRecords(){
    
        return [select Id,Name,Task_Date__c from Task_Manager__c where ownerId=:UserInfo.getUserId() and isCompleted__c=false WITH USER_MODE order by Task_Date__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<Task_Manager__c> loadAllCompleteRecords(){
    
        return [select Id,Name,Completed_Date__c from Task_Manager__c where ownerId=:UserInfo.getUserId() and isCompleted__c=true WITH USER_MODE ORDER BY Completed_Date__c desc];
    }
}