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
    [Route("api/library")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        // field for repository
        readonly LibraryRepository _repo;

        // constructor
        public LibraryController()
        {
            _repo = new LibraryRepository();
        }

        // HTTP GET METHODS

         [HttpGet]
         public IActionResult GetAllLibraries()
        {
            var libraries = _repo.GetLibraries();

            return Ok(libraries);
        }

        // HTTP POST METHODS
        [HttpPost]
        public IActionResult CreateLibrary(Library library)
        {
            var libraryId = _repo.CreateNewLibrary(library.UserId, library.LibraryName);

            return Ok(libraryId);
        }
    }
}
