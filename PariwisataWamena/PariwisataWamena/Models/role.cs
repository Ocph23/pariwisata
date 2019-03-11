using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("role")] 
     public class role 
   {
          [PrimaryKey("idrole")] 
          [DbColumn("idrole")] 
          public int idrole {  get; set;} 

          [DbColumn("name")] 
          public string name {  get; set;} 

     }
}


