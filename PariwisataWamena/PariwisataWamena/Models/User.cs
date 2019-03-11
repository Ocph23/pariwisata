using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace PariwisataWamena.Models {
     [TableName ("user")]
     public class user {
        private string _password;

        [PrimaryKey ("iduser")]
          [DbColumn ("iduser")]
          public int iduser { get; set; }

          [DbColumn ("username")]
          public string username { get; set; }

          [DbColumn("password")]
        public string password { get; set; }

          [DbColumn ("avatar")]
          public byte[] avatar { get; set; }

          public string Token { get; set; }
     }
}