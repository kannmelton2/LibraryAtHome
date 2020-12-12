using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using LibraryAtHome.Data;
using LibraryAtHome.Models;

namespace LibraryAtHome.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        // create a field for the Book Repository repo to be instantiated
        public BookRepository _repo;

        // constructor
        public BookController()
        {
            _repo = new BookRepository();
        }

        // HTTP GET METHODS

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _repo.GetBooks();

            return Ok(books);
        }

        [HttpGet("{libraryId}")]
        public IActionResult GetBooksByLibraryId(int libraryId)
        {
            var libraryBooks = _repo.GetBooksWithLibraryId(libraryId);

            if (libraryBooks == null) return NotFound();

            return Ok(libraryBooks);
        }
    }
}
