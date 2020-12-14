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

        // Get books using library Id
        [HttpGet("library-{libraryId}")]
        public IActionResult GetBooksByLibraryId(int libraryId)
        {
            var libraryBooks = _repo.GetBooksWithLibraryId(libraryId);

            if (libraryBooks == null) return NotFound();

            return Ok(libraryBooks);
        }

        // Get books using loan Id
        [HttpGet("loan-{loanId}")]
        public IActionResult GetBooksByLoanId(int loanId)
        {
            var loaningBooks = _repo.GetBooksWithLoanId(loanId);

            if (loaningBooks == null) return NoContent();

            return Ok(loaningBooks);
        }
    }
}
