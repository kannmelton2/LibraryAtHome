using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class Loan
    {
        public int LoanId { get; }
        public int UserId { get; set; }
        public int BorrowerId { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsComplete { get; set; }
        public bool Returned { get; set; }
    }
}
