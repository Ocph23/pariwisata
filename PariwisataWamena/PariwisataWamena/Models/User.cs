using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ocph.DAL;

namespace PariwisataWamena.Models {
    [TableName ("user")]
    public class User {
        [PrimaryKey ("iduser")]
        [DbColumn ("iduser")]
        public int iduser { get; set; }

        [DbColumn ("username")]
        public string username { get; set; }

        [DbColumn ("password")]
        public string password { get; set; }

        [DbColumn ("avatar")]
        public byte[] avatar { get; set; }

        [DbColumn ("PasswordHash")]
        public byte[] PasswordHash { get; set; }

        [DbColumn ("PasswordSalt")]
        public byte[] PasswordSalt { get; set; }

        public string token { get; set; }

        public IEnumerable<role> roles { get; set; }

        public string name { get; set; }

    }
}