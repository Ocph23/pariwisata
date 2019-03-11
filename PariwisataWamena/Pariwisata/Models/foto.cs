using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("foto")] 
     public class foto :Ifoto  
   {
          [PrimaryKey("idfoto")] 
          [DbColumn("idfoto")] 
          public int idfoto 
          { 
               get{return _idfoto;} 
               set{ 
                      _idfoto=value;
                     }
          } 

          [DbColumn("idarticle")] 
          public int idarticle 
          { 
               get{return _idarticle;} 
               set{ 
                      _idarticle=value;
                     }
          } 

          [DbColumn("data")] 
          public byte[] data 
          { 
               get{return _data;} 
               set{ 
                      _data=value;
                     }
          } 

          private int  _idfoto;
           private int  _idarticle;
           private byte[]  _data;
      }
}


