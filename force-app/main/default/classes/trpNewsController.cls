public with sharing class trpNewsController {
    
    @AuraEnabled(cacheable=true)
    public static Map<String,Object> retrieveNews(){
        // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
       privateUrlClass pr=new privateUrlClass();
       String url=pr.getEndPoint();

       HttpRequest req = new HttpRequest();
       req.setEndpoint(url);
       req.setMethod('GET');

       Map<String,Object> responseJsonMap= new Map<String,Object>();
       string strResponse=null;
       // Send the request, and return a response
       try{
        Http http = new Http();
        HttpResponse res = http.send(req);
        if(res.getStatusCode()==200){
            strResponse=res.getBody();
        }
        else{
            throw new CalloutException(res.getBody());
        }
       }
       catch(Exception ex){
        throw ex;
       }
       
       if(!String.isBlank(strResponse)){
        responseJsonMap=(Map<String,Object>)JSON.deserializeUntyped(strResponse);
       }


       return (!responseJsonMap.isEmpty()) ? responseJsonMap:null;
        
    }

    public class privateUrlClass{

        private string getEndPoint(){
            String url='https://newsapi.org/';

            NewsApis_Setting__mdt mc = NewsApis_Setting__mdt.getInstance('Top_headlines_News');

            url=url+mc.version__c+mc.endpointType__c+'?country='+mc.country__c+'&category='+mc.category__c+'&apiKey='+mc.ApiKey__c;

            return url;
        }
    }
}