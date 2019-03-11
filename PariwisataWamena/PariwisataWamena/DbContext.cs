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

            this.ConnectionString="server=localhost;database=dbpariwisata;uid=root;password=";
        }

        public IRepository<user> Users { get { return new Repository<user>(this); } }
         public IRepository<role> Roles { get { return new Repository<role>(this); } }
          public IRepository<userinrole> UserRoles { get { return new Repository<userinrole>(this); } }
             public IRepository<article> Article { get { return new Repository<article>(this); } }

    }
}
