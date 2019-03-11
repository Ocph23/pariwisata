using System;
 
 namespace PariwisataWamena.Models 
{ 
     public interface transaction  
   {
         int idtransaction {  get; set;} 

         int idservice {  get; set;} 

         int idtouris {  get; set;} 

         int count {  get; set;} 

         DateTime start {  get; set;} 

         DateTime end {  get; set;} 

         string payment {  get; set;} 

     }
}


