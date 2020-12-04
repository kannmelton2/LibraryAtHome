using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAtHome.Models
{
    public class Library
    {
        public int LibraryId { get; }
        public int UserId { get; set; }
        public string LibraryName { get; set; }
    }
}
