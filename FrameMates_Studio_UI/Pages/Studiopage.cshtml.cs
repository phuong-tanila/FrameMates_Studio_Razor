using FrameMates_Admin_UI.Helpers;
using FrameMates_Admin_UI.Models.Shared;
using FrameMates_Studio_UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrameMates_Studio_UI.Pages
{
    public class StudiopageModel : PageModel
    {
        private readonly IConfiguration _configuration;
        public StudiopageModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string ApiDomain { get; private set; }

        public async Task OnGetAsync()
        {
            ApiDomain = _configuration["apiDomain"];
        }
    }
}
