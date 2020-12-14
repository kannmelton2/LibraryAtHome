using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using LibraryAtHome.Models;

namespace LibraryAtHome.Data
{
    public class BookRepository
    {
        const string _connectionString = "Server=localhost;Database=LibraryAtHome;Trusted_Connection=True;";

        // GET ALL BOOKS
        public List<Book> GetBooks()
        {
            using var db = new SqlConnection(_connectionString);

            var allBooks = db.Query<Book>("select * from Book");

            return allBooks.ToList();
        }

        // GET BOOKS BY LIBRARY ID
        public List<LibraryBook> GetBooksWithLibraryId(int libraryId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select b.BookId, b.Title, b.Author, b.CoverImage, L.LibraryItemId, L.OnShelf
                          from LibraryItem L
                          join Book b
                          on L.BookId = b.BookId
                          Where L.LibraryId = @library
                          Order by b.Title";

            var parameters = new { library = libraryId };

            var librarysBooks = db.Query<LibraryBook>(query, parameters);

            return librarysBooks.ToList();
        } 

        // GET BOOKS WITH LOAN ID 
        public List<LibraryBook> GetBooksWithLoanId(int loanId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"Select b.BookId, b.Title, b.Author, b.CoverImage, li.LibraryItemId
                          from Loan lo
                          join LoanItem loi
                          on lo.LoanId = loi.LoanId
                          join LibraryItem li
                          on loi.LibraryItemId = li.LibraryItemId
                          join Book b
                          on li.BookId = b.BookId
                          Where lo.LoanId = @loan
                          Order by loi.LoanItemId";

            var parameters = new { loan = loanId };

            var books = db.Query<LibraryBook>(query, parameters);

            return books.ToList();
        }
    }
}
