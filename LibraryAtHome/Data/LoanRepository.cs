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

        // GET ALL LOANS
        public List<Loan> GetLoans()
        {
            using var db = new SqlConnection(_connectionString);

            var allLoans = db.Query<Loan>("select * from Loan");

            return allLoans.ToList();
        }

        // GET incomplete LOAN WITH USERID
        public Loan GetIncompleteLoanWithUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"Select *
                          from Loan
                          Where UserId = @user AND isComplete = 0";

            var parameters = new { user = userId };

            var loan = db.QueryFirstOrDefault<Loan>(query, parameters);

            return loan;
        }

        // Get loan with LoanId
        public Loan GetLoanWithLoanId(int loanId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Loan
                          Where LoanId = @loan";

            var parameters = new { loan = loanId };

            var loan = db.QueryFirstOrDefault<Loan>(query, parameters);

            return loan;
        }

        // CREATE A NEW LOAN
        public int CreateNewLoan(int userId, int borrowerId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[Loan]
                            ([UserId]
                            ,[BorrowerId]
                            ,[LoanDate]
                            ,[DueDate]
                            ,[isComplete]
                            ,[Returned])
                            OUTPUT Inserted.LoanId
                        VALUES
                            (@user
                            ,@borrower
                            ,getDate()
                            ,getDate()
                            ,0
                            ,0)";

            var parameters = new { user = userId, borrower = borrowerId };

            var newLoanId = db.QuerySingle<int>(query, parameters);

            return newLoanId;
        }

        // Complete a loan, is triggered when Complete button on loan cart page is pressed
        public Loan CompleteALoan(int loanId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"UPDATE [dbo].[Loan]
                          SET [LoanDate] = getDate()
	                     ,[DueDate] = DATEADD(day, 21, getDate())
                         ,[isComplete] = 1
                          WHERE LoanId = @loan";

            var parameters = new { loan = loanId };

            var completeLoan = db.QueryFirstOrDefault<Loan>(query, parameters);

            return completeLoan;
        }
    }
}
