using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("agent")] 
     public class agent  
   {
          [PrimaryKey("idagent")] 
          [DbColumn("idagent")] 
          public int idagent {  get; set;} 

          [DbColumn("name")] 
          public string name {  get; set;} 

          [DbColumn("address")] 
          public string address {  get; set;} 

          [DbColumn("contactName")] 
          public string contactName {  get; set;} 

          [DbColumn("telepon")] 
          public string telepon {  get; set;} 

          [DbColumn("userid")] 
          public int userid {  get; set;} 
          

     }
}


