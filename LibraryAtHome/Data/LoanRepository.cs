﻿using System;
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

        // Get completed loans with userId
        public List<Loan> GetLoansWithUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Loan
                          Where UserId = @user AND isComplete = 1 AND Returned = 0";

            var parameters = new { user = userId };

            var completeLoans = db.Query<Loan>(query, parameters);

            return completeLoans.ToList();
        }

        public List<Loan> GetDueSoonLoansWithUserId(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Loan
                          Where DueDate between getDate() and DATEADD(day, 7, getDate())
                          AND Returned = 0
                          AND UserId = @user";

            var parameters = new { user = userId };

            var completeLoans = db.Query<Loan>(query, parameters);

            return completeLoans.ToList();
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

            var queryTwo = @"Select *
                             From LoanItem
                             Where LoanId = @loan"; // get listLoanItems to isolate libraryItemId

            var parameters = new { loan = loanId };

            var completeLoan = db.QueryFirstOrDefault<Loan>(query, parameters);
            var loanItems = db.Query<LoanItem>(queryTwo, parameters);

            foreach (LoanItem loanItem in loanItems) {
                // sql query to update the LibraryItem table based on the LibraryItemId
                var queryThree = @"UPDATE [dbo].[LibraryItem]
                               SET [onShelf] = 0
                               WHERE LibraryItemId = @libraryItem";

                // parameters for above sql query, grabbing the loanItem's LibraryItemId
                var parametersThree = new { libraryItem = loanItem.LibraryItemId };

                // another query to update
                db.Execute(queryThree, parametersThree);
            }

            return completeLoan;
        }

        // Delete a loan and the loan items associated with it
        public void DeleteLoanWithLoanItems(int loanId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"Delete from LoanItem
                          Where LoanId = @loan

                          Delete from Loan
                          Where LoanId = @loan";

            var parameters = new { loan = loanId };

            db.Execute(query, parameters);
        }
    }
}
