using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class LoanItemRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        // GET ALL LOAN ITEMS
        public List<LoanItem> GetLoanItems()
        {
            using var db = new SqlConnection(_connectionString);

            var allLoanItems = db.Query<LoanItem>("Select * from LoanItem");

            return allLoanItems.ToList();
        }

    }
}
