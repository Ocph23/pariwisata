using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("touris")] 
     public class touris :Itouris  
   {
          [PrimaryKey("idtouris")] 
          [DbColumn("idtouris")] 
          public int idtouris 
          { 
               get{return _idtouris;} 
               set{ 
                      _idtouris=value;
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

          [DbColumn("gender")] 
          public string gender 
          { 
               get{return _gender;} 
               set{ 
                      _gender=value;
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

          [DbColumn("iduser")] 
          public int iduser 
          { 
               get{return _iduser;} 
               set{ 
                      _iduser=value;
                     }
          } 

          private int  _idtouris;
           private string  _name;
           private string  _gender;
           private string  _address;
           private int  _iduser;
      }
}


