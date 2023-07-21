namespace FrameMates_Studio_UI.Models
{
    public class Studio
    {
        public int StudioId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Address { get; set; }

        public int Status { get; set; }

        public double TotalRating { get; set; }

        public DateTime? CreateDate { get; set; }

        public string AvatarStudio { get; set; }

        public string CoverImage { get; set; }

        public Employee Owner { get; set; }
    }
}
