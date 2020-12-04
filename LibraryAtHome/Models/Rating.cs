using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class Rating
    {
        public int RatingId { get; }
        public int LibraryItemId { get; set; }
        public int Stars { get; set; }
        public string Review { get; set; }
    }
}
