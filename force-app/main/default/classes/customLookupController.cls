public with sharing class customLookupController {

    @AuraEnabled(cacheable=true)
    public static List<sObject> fetchLookUpData(String searchKey,String objectApiName){
        try {
            
            List<sObject> sObjectList=new List<sObject>();
            if(String.isBlank(searchKey)){
                return sObjectList;
            }
            else{
                string key='%'+searchKey+'%';
                string query='Select Id,Name from '+objectApiName+ ' Where Name like :key order by Name limit 5';

                sObjectList=Database.query(query,AccessLevel.USER_MODE);

                return sObjectList;
            }



        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}