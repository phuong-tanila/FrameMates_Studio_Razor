namespace FrameMates_Admin_UI.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }

        public DateTime BirthDate { get; set; }

        public int Status { get; set; }

        public string Address { get; set; }

        public Account AccountModel { get; set; }

        public DateTime CreateDate { get; set; }
    }
}
