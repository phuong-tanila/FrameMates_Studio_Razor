using FrameMates_Admin_UI.Models;

namespace FrameMates_Studio_UI.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public DateTime? OrderDate { get; set; }

        public string Status { get; set; }  

        public string Description { get; set; } 

        public string CheckIn { get; set; }

        public DateTime? PaymentDate { get; set; }

        public int Deposit { get; set; }

        public string Address { get; set; }

        public Customer Customer { get; set; }

        public List<OrderDetail> OrderDetails { get; set;}
    }
}