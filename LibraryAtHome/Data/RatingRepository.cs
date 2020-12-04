using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class RatingRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        public List<Rating> GetRatings()
        {
            using var db = new SqlConnection(_connectionString);

            var allRatings = db.Query<Rating>("select * from Rating");

            return allRatings.ToList();
        }

    }
}
