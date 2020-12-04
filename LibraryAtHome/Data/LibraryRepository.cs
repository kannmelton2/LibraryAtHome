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

    }
}
