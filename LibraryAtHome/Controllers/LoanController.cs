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

        // HTTP POST METHODS
        [HttpPost]
        public IActionResult CreateLoan(LoanLoanItem loanLoanItem)
        {
            var loanId = _repo.CreateNewLoan(loanLoanItem.UserId, loanLoanItem.BorrowerId);

            _loanItemRepo.CreateNewLoanItem(loanId, loanLoanItem.LibraryItemId);

            return Ok(loanId);
        }
    }
}
