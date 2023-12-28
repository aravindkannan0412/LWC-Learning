public with sharing class rtfMapControllerLWC {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id,Name,description,BillingStreet,BillingCity,BillingState,BillingPostalCode From Account ORDER BY Name LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}