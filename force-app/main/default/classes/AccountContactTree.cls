public with sharing class AccountContactTree {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> allAccountsWithContacts(){
        return [Select Id,Name,Phone,Website,(Select id,Name,Phone,Email From Contacts ) From Account Limit 6];
    }
}