using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class LibraryRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        // GET ALL LIBRARIES
        public List<Library> GetLibraries()
        {
            using var db = new SqlConnection(_connectionString);

            var allLibraries = db.Query<Library>("select * from Library");

            return allLibraries.ToList();
        }

        // CREATE A NEW LIBRARY
        public int CreateNewLibrary(int userId, string libraryName)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[Library]
                            ([UserId]
                            ,[LibraryName])
                            OUTPUT Inserted.LibraryId
                        VALUES
                            (@user
                            ,@libName)";

            var parameters = new { user = userId, libName = libraryName };

            var newLibraryId = db.QuerySingle<int>(query, parameters);

            return newLibraryId;

        }

    }
}
