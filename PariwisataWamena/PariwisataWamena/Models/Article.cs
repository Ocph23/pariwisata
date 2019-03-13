using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace PariwisataWamena.Models
{
    [TableName("article")]
    public class article
    {
        [PrimaryKey("idarticle")]
        [DbColumn("idarticle")]
        public int idarticle { get; set; }

        [DbColumn("title")]
        public string title { get; set; }

        [DbColumn("content")]
        public string content { get; set; }

        [DbColumn("draft")]
        public string draft { get; set; }

        [DbColumn("type")]
        public string type { get; set; }

        [DbColumn("createdate")]
        public DateTime createdate { get; set; }

        [DbColumn("thumb")]
        public byte[] thumb { get; set; }

        [DbColumn("iduser")]
        public int iduser { get; set; }


        [DbColumn("status")]
        public string status { get; set; }


        public IEnumerable<string> tags { get; set; }
        public user user { get; set; }
    }
}


