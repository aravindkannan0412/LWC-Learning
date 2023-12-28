public with sharing class RefreshController {
   
    @AuraEnabled
    public static Account getAccountRating(Id accountId){
      return [Select Id,Rating from Account where id=:accountId];
    }

}