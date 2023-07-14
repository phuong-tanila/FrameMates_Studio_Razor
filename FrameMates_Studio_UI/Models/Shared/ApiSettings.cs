namespace FrameMates_Admin_UI.Models.Shared
{
    public class ApiSettings
    {
        public static string Endpoint { get; set; } = "http://localhost:8080/api";
        public static string ServiceController { get; set; } = "/services";
        public static string CustomerController { get; set; } = "/customers";
        public static string AuthenticateController { get; set; } = "/auth";
    }
}
