using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryAtHome.Data;

namespace LibraryAtHome.Controllers
{
    [Route("api/rating")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        // field for repository
        readonly RatingRepository _repo;

        // constructor
        public RatingController()
        {
            _repo = new RatingRepository();
        }

        // HTTP GET METHODS
        public IActionResult GetAllRatings()
        {
            var ratings = _repo.GetRatings();

            return Ok(ratings);
        }
    }
}
