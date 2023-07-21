using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrameMates_Admin_UI.Pages
{
    public class LoginModel : PageModel
    {
        private readonly IConfiguration _configuration;

        public LoginModel(IConfiguration configuration)
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
