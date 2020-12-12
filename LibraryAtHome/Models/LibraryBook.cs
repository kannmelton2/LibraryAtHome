using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class LibraryBook
    {
        public int BookId { get; }
        public string Title { get; }
        public string Author { get; }
        public string CoverImage { get; }
        public int LibraryItemId { get; }
    }
}
