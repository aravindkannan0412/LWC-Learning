public with sharing class AccountControllerForExposeLWC {
    
    @AuraEnabled(cacheable=true)
    Public static List<Account> getAccountList(){
        try {
            return [SELECT Id,Name,Type,Industry from Account LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    Public static List<Account> filterAccountByType(string type){
        try {
            return [SELECT Id,Name,Type,Industry from Account where Type=:type Limit 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    Public static List<Account> findAccounts(string searchKey){

        string key='%'+searchKey +'%';
        try {
            return [SELECT Id,Name,Type,Industry from Account where Name Like :key Limit 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}