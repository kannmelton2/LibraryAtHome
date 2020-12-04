using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryAtHome.Data;

namespace LibraryAtHome.Controllers
{
    [Route("api/loan")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        // field for repository
        readonly LoanRepository _repo;

        // constructor
        public LoanController()
        {
            _repo = new LoanRepository();
        }

        // HTTP GET METHODS
        
        [HttpGet]
        public IActionResult GetAllLoans()
        {
            var loans = _repo.GetLoans();

            return Ok(loans);
        }
    }
}
