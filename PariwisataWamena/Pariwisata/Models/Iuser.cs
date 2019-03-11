using System;
 
 namespace PariwisataWamena.Models 
{ 
     public interface user  
   {
         int iduser {  get; set;} 

         string username {  get; set;} 

         string password {  get; set;} 

         byte[] avatar {  get; set;} 

     }
}


