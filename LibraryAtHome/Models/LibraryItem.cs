using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class LibraryItem
    {
        public int LibraryItemId { get; }
        public int LibraryId { get; set; }
        public int BookId { get; set; }
        public bool OnShelf { get; set; }
    }
}
