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

        // Get borrower using the loan Id
        [HttpGet("loan-{loanId}")]
        public IActionResult GetBorrowerByLoanId(int loanId)
        {
            var borrower = _repo.GetBorrowerWithLoanId(loanId);

            if (borrower == null) return NotFound("no borrowers associated with this loan id");

            return Ok(borrower);
        }

        // Get borrowers by userId
        [HttpGet("user-{userId}")]
        public IActionResult GetBorrowersByUserId(int userId)
        {
            var borrowers = _repo.GetBorrowersWithUserId(userId);

            if (borrowers == null) return NoContent();

            return Ok(borrowers);
        }


        // POST METHODS
        [HttpPost]
        public IActionResult CreateBorrower(Borrower borrower)
        {
            var borrowerId = _repo.CreateNewBorrower(borrower.FirstName, borrower.LastName, borrower.Email, borrower.UserId);

            return Ok(borrowerId);
        }

    }
}
