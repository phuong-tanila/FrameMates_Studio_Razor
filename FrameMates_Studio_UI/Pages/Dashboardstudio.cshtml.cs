using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrameMates_Studio_UI.Pages
{
    public class DashboardstudioModel : PageModel
    {
        private readonly IConfiguration _configuration;

        public DashboardstudioModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string ApiDomain { get; private set; }

        public void OnGet()
        {
            ApiDomain = _configuration["apiDomain"];
        }
    }
}
