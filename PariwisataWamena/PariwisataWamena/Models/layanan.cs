using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("service")] 
     public class layanan 
   {
          [PrimaryKey("idservice")] 
          [DbColumn("idservice")] 
          public int idservice {  get; set;} 

          [DbColumn("name")] 
          public string name {  get; set;} 

          [DbColumn("content")] 
          public string content {  get; set;} 

          [DbColumn("idagent")] 
          public int idagent {  get; set;} 

          [DbColumn("price")] 

          public double price {  get; set;} 


           [DbColumn("active")] 

          public bool active {  get; set;} 

     }
}


