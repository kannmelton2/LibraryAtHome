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

        // CREATE A NEW USER
        public int CreateNewUser(string firstName, string lastName, string emailAddress)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[User]
                            ([FirstName]
                            ,[LastName]
                            ,[Email])
                            OUTPUT Inserted.UserId
                        VALUES
                            (@first
                            ,@last
                            ,@email)";

            var parameters = new { first = firstName, last = lastName, email = emailAddress };

            var newUserId = db.QuerySingle<int>(query, parameters);

            return newUserId;
        }
    }
}
