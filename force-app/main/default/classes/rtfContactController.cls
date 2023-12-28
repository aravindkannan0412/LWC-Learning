public with sharing class rtfContactController {
    

    @AuraEnabled(cacheable=true)
    public static List<Contact> getcontactList(){
        try {
            return [SELECT id,Name,Email,Title From Contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}