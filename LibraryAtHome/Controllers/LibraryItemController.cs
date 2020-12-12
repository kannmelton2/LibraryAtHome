using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryAtHome.Data;
using LibraryAtHome.Models;

namespace LibraryAtHome.Controllers
{
    [Route("api/libraryItem")]
    [ApiController]
    public class LibraryItemController : ControllerBase
    {
        // field for repository
        readonly LibraryItemRepository _repo;

        // constructor
        public LibraryItemController()
        {
            _repo = new LibraryItemRepository();
        }

        // HTTP GET METHODS

        // Get all Library Items
        [HttpGet]
        public IActionResult GetAllLibraryItems()
        {
            var libraryItems = _repo.GetLibraryItems();

            return Ok(libraryItems);
        }

        // Get Library Items with LibraryId
        [HttpGet("{libraryId}")]
        public IActionResult GetLibraryItemsByLibraryId(int libraryId)
        {
            var libraryItems = _repo.GetLibraryItemsWithLibraryId(libraryId);

            if (libraryItems == null) return NotFound("No Library items associated with that Id");

            return Ok(libraryItems);
        }

        // POST METHODS

        // Add a new library item (book) to the library
        [HttpPost]
        public IActionResult CreateLibraryItem(LibraryItem libraryItem)
        {
            var newLibraryItemId = _repo.CreateNewLibraryItem(libraryItem.LibraryId, libraryItem.BookId);

            return Ok(newLibraryItemId);
        }
    }
}
