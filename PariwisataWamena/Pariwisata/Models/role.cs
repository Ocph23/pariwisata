using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("role")] 
     public class role :Irole  
   {
          [PrimaryKey("idrole")] 
          [DbColumn("idrole")] 
          public int idrole 
          { 
               get{return _idrole;} 
               set{ 
                      _idrole=value;
                     }
          } 

          [DbColumn("name")] 
          public string name 
          { 
               get{return _name;} 
               set{ 
                      _name=value;
                     }
          } 

          private int  _idrole;
           private string  _name;
      }
}


