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
    }
}
