using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class LibraryItemRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        // GET ALL LIBRARYITEMS
        public List<LibraryItem> GetLibraryItems()
        {
            using var db = new SqlConnection(_connectionString);

            var libraryItems = db.Query<LibraryItem>("select * from LibraryItem");

            return libraryItems.ToList();
        }

        // GET LIBRARY ITEMS WITH LIBRARYID
        public List<LibraryItem> GetLibraryItemsWithLibraryId(int libraryId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"Select *
                          From LibraryItem
                          Where LibraryId = @library";

            var parameters = new { library = libraryId };

            var libraryItems = db.Query<LibraryItem>(query, parameters);

            return libraryItems.ToList();
        }

        // CREATE A NEW LIBRARY ITEM
        public int CreateNewLibraryItem(int libraryId, int bookId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"INSERT INTO [dbo].[LibraryItem]
                          ([LibraryId]
                          ,[BookId]
                          ,[onShelf])
                      VALUES
                          (@library
                          ,@book
                          ,1)";

            var parameters = new { library = libraryId, book = bookId };

            var libraryItemId = db.ExecuteScalar<int>(query, parameters);

            return libraryItemId;
        }

        // UPDATE onShelf to true when a LibraryItem is being returned
        public void AddBookToShelf(int libraryItemId)
        {
            using var db = new SqlConnection(_connectionString);

            // update the library item to be onShelf = 1 (true)
            var query = @"UPDATE [dbo].[LibraryItem]
                          SET [onShelf] = 1
                          WHERE LibraryItemId = @libraryItem";

            // update the loan item to be isReturned = 1 (true)
            // we determine which loan item we want to target by using the libraryItemId and isReturned = 0 (false), since all loanItems with that libraryItemId should
            // be isReturned = 1 (true)
            var queryTwo = @"UPDATE [dbo].[LoanItem]
                             SET [IsReturned] = 1
                             OUTPUT Inserted.LoanId
                             Where LibraryItemId = @libraryItem AND isReturned = 0";

            var queryThree = @"Select *
                               from LoanItem
                               Where loanId = @loan";

            var queryFour = @"UPDATE [dbo].[Loan]
                              SET [Returned] = 1
                              WHERE LoanId = @loan";



            var parameters = new { libraryItem = libraryItemId };

            // declare the loanId variable before assigning its value to a parameter for use in a query
            var loanId = db.QuerySingle<int>(queryTwo, parameters);

            var parametersThree = new { loan = loanId };

            // create a loanItems variable to hold all the loanItems associated with a loanId
            var loanItems = db.Query<LoanItem>(queryThree, parametersThree);

            // determine if all the loanItems have been returned
            var count = 0;
            foreach (LoanItem loanItem in loanItems)
            {
                if (loanItem.isReturned)
                {
                    count++;
                }
            }

            if (count == loanItems.Count()) {
                // call queryFour
                db.Execute(queryFour, parametersThree);
            }

            // if they have all been returned, update the loan to returned = 1

            db.Execute(query, parameters);
        }
    }
}
