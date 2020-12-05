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
    [Route("api/borrower")]
    [ApiController]
    public class BorrowerController : ControllerBase
    {
        // field for repo
        readonly BorrowerRepository _repo;

        // constructor
        public BorrowerController()
        {
            _repo = new BorrowerRepository();
        }

        // HTTP GET METHODS

        [HttpGet]
        public IActionResult GetAllBorrowers()
        {
            var borrowers = _repo.GetBorrowers();

            return Ok(borrowers);
        }

        [HttpPost]
        public IActionResult CreateBorrower(Borrower borrower)
        {
            var borrowerId = _repo.CreateNewBorrower(borrower.FirstName, borrower.LastName, borrower.Email, borrower.UserId);

            return Ok(borrowerId);
        }
    }
}
