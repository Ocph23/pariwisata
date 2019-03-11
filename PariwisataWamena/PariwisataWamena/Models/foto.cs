using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("foto")] 
     public class foto  
   {
          [PrimaryKey("idfoto")] 
          [DbColumn("idfoto")] 
          public int idfoto {  get; set;} 

          [DbColumn("idarticle")] 
          public int idarticle {  get; set;} 

          [DbColumn("data")] 
          public byte[] data {  get; set;} 

     }
}


