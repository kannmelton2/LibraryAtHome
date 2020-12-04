using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class BorrowerRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        // GET ALL BORROWERS
        public List<Borrower> GetBorrowers()
        {
            using var db = new SqlConnection(_connectionString);

            var allBorrowers = db.Query<Borrower>("select * from Borrower");

            return allBorrowers.ToList();
        } 

    }
}
