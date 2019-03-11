using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("service")] 
     public class service :Iservice  
   {
          [PrimaryKey("idservice")] 
          [DbColumn("idservice")] 
          public int idservice 
          { 
               get{return _idservice;} 
               set{ 
                      _idservice=value;
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

          [DbColumn("content")] 
          public string content 
          { 
               get{return _content;} 
               set{ 
                      _content=value;
                     }
          } 

          [DbColumn("idagent")] 
          public int idagent 
          { 
               get{return _idagent;} 
               set{ 
                      _idagent=value;
                     }
          } 

          [DbColumn("price")] 
          public double price 
          { 
               get{return _price;} 
               set{ 
                      _price=value;
                     }
          } 

          private int  _idservice;
           private string  _name;
           private string  _content;
           private int  _idagent;
           private double  _price;
      }
}


