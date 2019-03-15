

using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PariwisataWamena.Models
{
    // public class ApplicationDbContext : IdentityDbContext
    // {
    //     public ApplicationDbContext(DbContextOptions options) : base(options)
    //     {
    //     }

    //     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //     {
    //         optionsBuilder.UseMySql(GetConnectionString());
    //     }


    //     private static string GetConnectionString()
    //     {
    //         const string databaseName = "dbpariwisata";
    //         const string databaseUser = "root";
    //         const string databasePass = "";

    //         return $"Server=localhost;" +
    //                $"database={databaseName};" +
    //                $"uid={databaseUser};" +
    //                $"pwd={databasePass};" +
    //                $"pooling=true;";
    //     }
    // }



}