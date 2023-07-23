using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrameMates_Studio_UI.Pages
{
    public class LogoutModel : PageModel
    {
        public IActionResult OnGet()
        {
            Response.Cookies.Delete("accessToken");
            Response.Cookies.Delete("refreshToken");
            TempData["Studio"] = null;
            return RedirectToPage("Login");
        }
    }
}
