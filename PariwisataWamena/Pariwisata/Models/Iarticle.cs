using System;
 
 namespace PariwisataWamena.Models 
{ 
     public interface article  
   {
         int idarticle {  get; set;} 

         string title {  get; set;} 

         string content {  get; set;} 

         string type {  get; set;} 

         DateTime createdate {  get; set;} 

         byte[] thumb {  get; set;} 

         int iduser {  get; set;} 

     }
}


