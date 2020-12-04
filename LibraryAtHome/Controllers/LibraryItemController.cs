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

        [HttpGet]
        public IActionResult GetAllLibraryItems()
        {
            var libraryItems = _repo.GetLibraryItems();

            return Ok(libraryItems);
        }
    }
}
