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
    }
}
