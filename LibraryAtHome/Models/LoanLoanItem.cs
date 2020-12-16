using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class LoanLoanItem
    {
        public int UserId { get; set; }
        public int BorrowerId { get; set; }
        public int LibraryItemId { get; set; }
    }
}
