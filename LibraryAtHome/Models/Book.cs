using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class Book
    {
        public int BookId { get;  }
        public string Title { get; }
        public string Author { get; }
        public string Publisher { get; }
        public DateTime PublishDate { get; }
        public string ISBN { get; }
        public string CoverImage { get; }
    }
}
