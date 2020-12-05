using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryAtHome.Data;

namespace LibraryAtHome.Controllers
{
    [Route("api/loanItem")]
    [ApiController]
    public class LoanItemController : ControllerBase
    {
        // field for repository
        readonly LoanItemRepository _repo;

        // constructor
        public LoanItemController()
        {
            _repo = new LoanItemRepository();
        }

        // HTTP GET METHODS

        // get all loan items
        [HttpGet]
        public IActionResult GetAllLoanItems()
        {
            var loanItems = _repo.GetLoanItems();

            return Ok(loanItems);
        }

        // get loan itmes by loanId
        [HttpGet("{loanId}")]
        public IActionResult GetLoanItemsByLoanId(int loanId)
        {
            var loanItems = _repo.GetLoanItemsWithLoanId(loanId);

            if (loanItems == null) return NotFound("No Loan with that Id");

            return Ok(loanItems);
        }

    }
}
