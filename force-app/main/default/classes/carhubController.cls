public with sharing class carhubController {
   
    @AuraEnabled(Cacheable=true)
    public static List<Car__c> getCars(Filters filters){
        String key,whereClause='';
        Decimal maxPrice;
        String[] categories,makeType,criteria=new List<string>{};
        if(filters!=null){
            maxPrice=filters.maxPrice;
            categories=filters.categories;
            makeType=filters.makeType;
            if(!String.isEmpty(filters.searchKey)){
                key='%'+filters.searchKey+'%';
                criteria.add('Name LIKE : key');
            }
            if(filters.maxPrice>=0){
                criteria.add('MSRP__c <=:maxPrice');
            }
            if(filters.categories!=null){
                criteria.add('Category__c in :categories');
            }
            if(filters.makeType!=null){
                criteria.add('Make__c in :makeType');
            }
            if(criteria.size()>0){
                whereClause='WHERE '+String.join(criteria, ' AND ');
            }
        }
        string Query='SELECT id,Name,Category__c,Control__c,Description__c,Fuel_Type__c,Make__c,MSRP__c,Seats__c,Picutre_URL__c FROM Car__c '+whereClause +' WITH SECURITY_ENFORCED'+' ORDER BY Name';

        return Database.query(Query); 
        

    }

    public class Filters{
        @AuraEnabled public String searchKey {get;set;}
        @AuraEnabled public Decimal maxPrice {get;set;}
        @AuraEnabled public String[] categories {get;set;}
        @AuraEnabled public String[] makeType {get;set;}
    }

    @AuraEnabled(Cacheable=true)
    public static List<Car__c> getSimilarCars(Id carId,String[] makeType){

        return [SELECT id,Name,Category__c,Control__c,Description__c,Fuel_Type__c,Make__c,MSRP__c,Seats__c,Picutre_URL__c FROM Car__c where Make__c in :makeType and id !=:carId];
    }
}