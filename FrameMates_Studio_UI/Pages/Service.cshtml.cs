using FrameMates_Admin_UI.Helpers;
using FrameMates_Admin_UI.Models.Shared;
using FrameMates_Studio_UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrameMates_Studio_UI.Pages
{
    public class ServiceModel : PageModel
    {
        private readonly IConfiguration _configuration;
        public List<ServicePack> Service { get; set; }
        public ServiceModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string ApiDomain { get; private set; }

        public async Task OnGetAsync(int? pageNo)
        {
            if (pageNo == null) { pageNo = 0; }
            ApiDomain = _configuration["apiDomain"];
            var tmpService = new PaginationResponse<ServicePack>();

            using (HttpClient client = new HttpClient())
            {
                var apiUrl = ApiDomain + "api/studios/current-owner";
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Request.Cookies["accessToken"]);
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                string responseBody = await response.Content.ReadAsStringAsync();
                var studioJSONConverter = new JsonHelper<Studio>();
                if (response.IsSuccessStatusCode)
                {
                    Studio studio = studioJSONConverter.ToModel(responseBody);

                    apiUrl = ApiDomain + "api/services/studio/" + studio.StudioId + "?pageNo=0";

                    response = await client.GetAsync(apiUrl);
                    responseBody = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonHelper = new JsonHelper<PaginationResponse<ServicePack>>();
                        var page = jsonHelper.ToModel(responseBody);
                        Service = page.Items;
                    }
                    else
                    {
                        Console.Write(response.StatusCode.ToString());
                        Console.Write(responseBody);
                    }
                }
            }
        }
    }
}
