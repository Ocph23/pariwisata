using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("article")] 
     public class article :Iarticle  
   {
          [PrimaryKey("idarticle")] 
          [DbColumn("idarticle")] 
          public int idarticle 
          { 
               get{return _idarticle;} 
               set{ 
                      _idarticle=value;
                     }
          } 

          [DbColumn("title")] 
          public string title 
          { 
               get{return _title;} 
               set{ 
                      _title=value;
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

          [DbColumn("type")] 
          public string type 
          { 
               get{return _type;} 
               set{ 
                      _type=value;
                     }
          } 

          [DbColumn("createdate")] 
          public DateTime createdate 
          { 
               get{return _createdate;} 
               set{ 
                      _createdate=value;
                     }
          } 

          [DbColumn("thumb")] 
          public byte[] thumb 
          { 
               get{return _thumb;} 
               set{ 
                      _thumb=value;
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

          private int  _idarticle;
           private string  _title;
           private string  _content;
           private string  _type;
           private DateTime  _createdate;
           private byte[]  _thumb;
           private int  _iduser;
      }
}


