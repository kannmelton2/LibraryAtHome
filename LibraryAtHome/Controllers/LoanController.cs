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
    [Route("api/loan")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        // field for repository
        readonly LoanRepository _repo;
        readonly LoanItemRepository _loanItemRepo;

        // constructor
        public LoanController()
        {
            _repo = new LoanRepository();
            _loanItemRepo = new LoanItemRepository();
        }

        // HTTP GET METHODS

        [HttpGet]
        public IActionResult GetAllLoans()
        {
            var loans = _repo.GetLoans();

            return Ok(loans);
        }

        [HttpGet("{userId}")]
        public IActionResult GetIncompleteLoanByUserId(int userId)
        {
            var loan = _repo.GetIncompleteLoanWithUserId(userId);

            if (loan == null) return NoContent();

            return Ok(loan);
        }

        // Get loan with loan Id
        [HttpGet("get-{loanId}")]
        public IActionResult GetLoanByLoanId(int loanId)
        {
            var loan = _repo.GetLoanWithLoanId(loanId);

            if (loan == null) return NoContent();

            return Ok(loan);
        }

        // HTTP POST METHODS
        [HttpPost]
        public IActionResult CreateLoan(LoanLoanItem loanLoanItem)
        {
            var loanId = _repo.CreateNewLoan(loanLoanItem.UserId, loanLoanItem.BorrowerId);

            _loanItemRepo.CreateNewLoanItem(loanId, loanLoanItem.LibraryItemId);

            return Ok(loanId);
        }

        // HTTP PUT METHODS

        [HttpPut("put-{loanId}")]
        public IActionResult CompleteLoan(int loanId)
        {
            var completedLoan = _repo.CompleteALoan(loanId);

            return Ok(completedLoan);
        }

        // HTTP DELETE METHODS
        [HttpDelete("del-{loanId}")]
        public IActionResult DeleteLoanAndLoanItems(int loanId)
        {
            if (_repo.GetLoanWithLoanId(loanId) == null)
            {
                return NotFound("No loan found with that id");
            }

            _repo.DeleteLoanWithLoanItems(loanId);

            return Ok();
        }
    }
}
