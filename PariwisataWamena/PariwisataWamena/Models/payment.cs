using Ocph.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PariwisataWamena.Models
{
    [TableName("payment")]
    public class payment
    {
        [PrimaryKey("Id")]
        [DbColumn("Id")]
        public int id { get; set; }

        [DbColumn("datepayment")]
        public int datepayment { get; set; }



        [DbColumn("bank")]
        public int bank{ get; set; }


        [DbColumn("amount")]
        public double amount { get; set; }


    }
}
