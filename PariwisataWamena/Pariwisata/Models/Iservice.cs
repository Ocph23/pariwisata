using System;
 
 namespace PariwisataWamena.Models 
{ 
     public interface service  
   {
         int idservice {  get; set;} 

         string name {  get; set;} 

         string content {  get; set;} 

         int idagent {  get; set;} 

         double price {  get; set;} 

     }
}


