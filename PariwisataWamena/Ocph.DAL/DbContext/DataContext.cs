﻿using Ocph.DAL.Provider.MySql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Ocph.DAL.DbContext
{
   public class DataContext
    {
        public static IDataTable<T> GetDatatable<T>(IDbConnection connection) where T : class
        {
            IDataTable<T> c = null;
            var ts = connection.GetType();
            if (ts.BaseType.Name == "MySqlDbConnection")
            {
                c = new MySqlDbContext<T>(connection);
            }  
            return c;
        }

    }
}
