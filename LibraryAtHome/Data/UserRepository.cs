using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using LibraryAtHome.Models;
using Dapper;

namespace LibraryAtHome.Data
{
    public class UserRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        // GET ALL USERS
        public List<User> GetUsers()
        {
            using var db = new SqlConnection(_connectionString);

            var allUsers = db.Query<User>("select * from [User]");

            return allUsers.ToList();
        }
    }
}
