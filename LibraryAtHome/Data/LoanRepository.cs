using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class LoanRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        public List<Loan> GetLoans()
        {
            using var db = new SqlConnection(_connectionString);

            var allLoans = db.Query<Loan>("select * from Loan");

            return allLoans.ToList();
        }
    }
}
