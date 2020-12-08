using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using LibraryAtHome.Models;
using LibraryAtHome.Data;


namespace LibraryAtHome.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // create a repo field to instantiate the User Repository
        readonly UserRepository _repo;
        readonly LibraryRepository _libraryRepo;

        // constructor 
        public UserController()
        {
            _repo = new UserRepository();
            _libraryRepo = new LibraryRepository();
        }

        // HTTP GET METHODS

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetUsers();

            return Ok(allUsers);
        }

        [HttpGet("{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            var authenticatedUser = _repo.GetUserWithEmail(email);

            return Ok(authenticatedUser);
        }

        // HTTP POST METHODS
        [HttpPost]
        public IActionResult CreateUserAndLibrary(UserLibrary userLibrary)
        {
            var userId = _repo.CreateNewUser(userLibrary.FirstName, userLibrary.LastName, userLibrary.Email);

            _libraryRepo.CreateNewLibrary(userId, userLibrary.LibraryName);

            return Ok(userId);
        }

    }
}
