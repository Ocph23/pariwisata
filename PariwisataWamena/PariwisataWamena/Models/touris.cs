using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("touris")] 
     public class touris
   {
          [PrimaryKey("idtouris")] 
          [DbColumn("idtouris")] 
          public int idtouris {  get; set;} 

          [DbColumn("name")] 
          public string name {  get; set;} 

          [DbColumn("gender")] 
          public string gender {  get; set;} 

          [DbColumn("address")] 
          public string address {  get; set;} 

          [DbColumn("iduser")] 
          public int iduser {  get; set;} 

     }
}


