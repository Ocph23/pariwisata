using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("transaction")] 
     public class transaction 
   {
          [PrimaryKey("idtransaction")] 
          [DbColumn("idtransaction")] 
          public int idtransaction {  get; set;} 

          [DbColumn("idservice")] 
          public int idservice {  get; set;} 

          [DbColumn("idtouris")] 
          public int idtouris {  get; set;} 

          [DbColumn("count")] 
          public int count {  get; set;} 

          [DbColumn("start")] 
          public DateTime start {  get; set;} 

          [DbColumn("end")] 
          public DateTime end {  get; set;} 

          [DbColumn("payment")] 
          public string payment {  get; set;} 

     }
}


