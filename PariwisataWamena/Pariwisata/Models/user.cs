using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("user")] 
     public class user :Iuser  
   {
          [PrimaryKey("iduser")] 
          [DbColumn("iduser")] 
          public int iduser 
          { 
               get{return _iduser;} 
               set{ 
                      _iduser=value;
                     }
          } 

          [DbColumn("username")] 
          public string username 
          { 
               get{return _username;} 
               set{ 
                      _username=value;
                     }
          } 

          [DbColumn("password")] 
          public string password 
          { 
               get{return _password;} 
               set{ 
                      _password=value;
                     }
          } 

          [DbColumn("avatar")] 
          public byte[] avatar 
          { 
               get{return _avatar;} 
               set{ 
                      _avatar=value;
                     }
          } 

          private int  _iduser;
           private string  _username;
           private string  _password;
           private byte[]  _avatar;
      }
}


