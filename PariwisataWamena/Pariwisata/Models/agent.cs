using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("agent")] 
     public class agent :Iagent  
   {
          [PrimaryKey("idagent")] 
          [DbColumn("idagent")] 
          public int idagent 
          { 
               get{return _idagent;} 
               set{ 
                      _idagent=value;
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

          [DbColumn("address")] 
          public string address 
          { 
               get{return _address;} 
               set{ 
                      _address=value;
                     }
          } 

          [DbColumn("contactName")] 
          public string contactName 
          { 
               get{return _contactname;} 
               set{ 
                      _contactname=value;
                     }
          } 

          [DbColumn("telepon")] 
          public string telepon 
          { 
               get{return _telepon;} 
               set{ 
                      _telepon=value;
                     }
          } 

          [DbColumn("userid")] 
          public int userid 
          { 
               get{return _userid;} 
               set{ 
                      _userid=value;
                     }
          } 

          private int  _idagent;
           private string  _name;
           private string  _address;
           private string  _contactname;
           private string  _telepon;
           private int  _userid;
      }
}


