namespace FrameMates_Studio_UI.Models
{
    public class OrderDetail
    {
        public int OrderDetailId { get; set; }

        public int Price { get; set; }

        public int Discount { get; set; }

        public int? Rating { get; set; }

        public string? Content { get; set; } 

        public DateTime? PostDate { get; set; }

        public ServicePack ServicePack { get; set; }
    }
}
