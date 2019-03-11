using System; 
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;
 
 namespace PariwisataWamena.Models 
{ 
     [TableName("transaction")] 
     public class transaction :Itransaction  
   {
          [PrimaryKey("idtransaction")] 
          [DbColumn("idtransaction")] 
          public int idtransaction 
          { 
               get{return _idtransaction;} 
               set{ 
                      _idtransaction=value;
                     }
          } 

          [DbColumn("idservice")] 
          public int idservice 
          { 
               get{return _idservice;} 
               set{ 
                      _idservice=value;
                     }
          } 

          [DbColumn("idtouris")] 
          public int idtouris 
          { 
               get{return _idtouris;} 
               set{ 
                      _idtouris=value;
                     }
          } 

          [DbColumn("count")] 
          public int count 
          { 
               get{return _count;} 
               set{ 
                      _count=value;
                     }
          } 

          [DbColumn("start")] 
          public DateTime start 
          { 
               get{return _start;} 
               set{ 
                      _start=value;
                     }
          } 

          [DbColumn("end")] 
          public DateTime end 
          { 
               get{return _end;} 
               set{ 
                      _end=value;
                     }
          } 

          [DbColumn("payment")] 
          public string payment 
          { 
               get{return _payment;} 
               set{ 
                      _payment=value;
                     }
          } 

          private int  _idtransaction;
           private int  _idservice;
           private int  _idtouris;
           private int  _count;
           private DateTime  _start;
           private DateTime  _end;
           private string  _payment;
      }
}


