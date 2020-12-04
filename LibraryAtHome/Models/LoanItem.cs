using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class LoanItem
    {
        public int LoanItemId { get; }
        public int LoanId { get; set; }
        public int LibraryItemId { get; set; }
        public bool isReturned { get; set; }
    }
}
