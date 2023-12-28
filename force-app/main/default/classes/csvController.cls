public with sharing class csvController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
       return [select Id,Name,Phone,AnnualRevenue,Industry from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccounts(){
       return [select Id,Name,Phone,Website,Industry from Account];
    }
}