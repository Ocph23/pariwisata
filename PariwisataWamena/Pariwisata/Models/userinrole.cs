using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("userinrole")] 
     public class userinrole :Iuserinrole  
   {
          [PrimaryKey("iduserinrole")] 
          [DbColumn("iduserinrole")] 
          public int iduserinrole 
          { 
               get{return _iduserinrole;} 
               set{ 
                      _iduserinrole=value;
                     }
          } 

          [DbColumn("idrole")] 
          public int idrole 
          { 
               get{return _idrole;} 
               set{ 
                      _idrole=value;
                     }
          } 

          [DbColumn("iduser")] 
          public int iduser 
          { 
               get{return _iduser;} 
               set{ 
                      _iduser=value;
                     }
          } 

          private int  _iduserinrole;
           private int  _idrole;
           private int  _iduser;
      }
}


