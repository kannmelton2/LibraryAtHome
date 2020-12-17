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

        // GET LOANS BY LOANID 
        public List<LoanItem> GetLoanItemsWithLoanId(int loanId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"Select *
                          From LoanItem
                          Where LoanId = @loan";

            var parameters = new { loan = loanId };

            var loanItems = db.Query<LoanItem>(query, parameters);

            return loanItems.ToList();
        }

        // Create a new loan item
        public int CreateNewLoanItem(int loanId, int libraryItemId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[LoanItem]
                          ([LoanId]
                          ,[LibraryItemId]
                          ,[IsReturned])
                          OUTPUT inserted.LoanItemId
                      VALUES
                          (@loan
                          ,@libraryItem
                          ,0)";

            var parameters = new { loan = loanId, libraryItem = libraryItemId };

            var loanItemId = db.QuerySingle<int>(query, parameters);

            return loanItemId;
        }
    }
}
