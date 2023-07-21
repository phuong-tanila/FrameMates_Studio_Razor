using System.Collections.Generic;

namespace FrameMates_Admin_UI.Models.Shared
{
    public class PaginationResponse<T>
    {
        public int PageNum { get; set; }

        public int PageSize { get; set; }

        public int TotalPageNum { get; set; }

        public long TotalItems { get; set; }

        public List<T> Items { get; set; }
    }
}
