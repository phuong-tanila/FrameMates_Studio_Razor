using FrameMates_Admin_UI.Models;

namespace FrameMates_Studio_UI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public int Status { get; set; }

        public Account AccountModel { get; set; }
    }
}
