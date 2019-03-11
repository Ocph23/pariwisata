using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("userinrole")] 
     public class userinrole 
   {
          [PrimaryKey("iduserinrole")] 
          [DbColumn("iduserinrole")] 
          public int iduserinrole {  get; set;} 

          [DbColumn("idrole")] 
          public int idrole {  get; set;} 

          [DbColumn("iduser")] 
          public int iduser {  get; set;} 

     }
}


