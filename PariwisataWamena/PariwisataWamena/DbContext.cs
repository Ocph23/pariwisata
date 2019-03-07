using MongoDB.Driver;
using PariwisataWamena.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace PariwisataWamena
{
    public class DbContext : IDisposable
    {
        private MongoClient dbClient;
        private IMongoDatabase db;

        public DbContext()
        {
            dbClient = new MongoClient("mongodb://ocph23:Sony77@ds147125.mlab.com:47125/heroku_l5k9k33h");
            db = dbClient.GetDatabase("heroku_l5k9k33h");
        }

        public IMongoCollection<User> Users { get { return db.GetCollection<User>("user"); } }

        public void Dispose()
        {
         
        }
    }
}
