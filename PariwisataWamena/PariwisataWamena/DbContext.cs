//using MongoDB.Driver;
using Ocph.DAL.Repository;
using PariwisataWamena.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace PariwisataWamena
{
    public class DbContext : Ocph.DAL.Provider.MySql.MySqlDbConnection
    {
        // private MongoClient dbClient;
        // private IMongoDatabase db;
        // private string appSettingsSection = Configuration.GetSection ("AppSettings");
        public DbContext()
        {
            // dbClient = new MongoClient("mongodb://ocph23:Sony77@ds147125.mlab.com:47125/heroku_l5k9k33h");
            // db = dbClient.GetDatabase("heroku_l5k9k33h");
            // var a = Configuration.GetSection ("AppSettings");

            this.ConnectionString = "server=localhost;database=dbpariwisata;uid=root;password=";
            //this.ConnectionString="server=us-cdbr-iron-east-03.cleardb.net;database=heroku_c7c590f5166336f;uid=b82d83c3ac4131;password=3a78dca0;port=3306";
        }

        public IRepository<User> Users { get { return new Repository<User>(this); } }
        public IRepository<role> Roles { get { return new Repository<role>(this); } }
        public IRepository<userinrole> UserRoles { get { return new Repository<userinrole>(this); } }
        public IRepository<article> Article { get { return new Repository<article>(this); } }

        public IRepository<layanan> Layanan { get { return new Repository<layanan>(this); } }

           public IRepository<agent> Agent { get { return new Repository<agent>(this); } }

    }
}
