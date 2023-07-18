using FrameMates_Admin_UI.Helpers;
using FrameMates_Admin_UI.Models.Shared;
using FrameMates_Studio_UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FrameMates_Studio_UI.Pages
{
    public class ChatpageModel : PageModel
    {
        private readonly IConfiguration _configuration;
        public List<ServicePack> Services { get; set; }
        public Studio Studio { get; set; }
        public ChatpageModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string ApiDomain { get; private set; }

        public async Task OnGetAsync()
        {
            ApiDomain = _configuration["apiDomain"];
            var tmpService = new ServicePack();

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

                    apiUrl = ApiDomain + "api/services/studio/all/" + studio.StudioId;

                    response = await client.GetAsync(apiUrl);
                    responseBody = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        var jsonHelper = new JsonHelper<List<ServicePack>>();
                        var servicePacks = jsonHelper.ToModel(responseBody);
                        Services = servicePacks;
                    }
                    else
                    {
                        Console.Write(response.StatusCode.ToString());
                        Console.Write(responseBody);
                    }
                }
                else
                {
                    Console.WriteLine(responseBody);
                    Console.WriteLine(response.StatusCode.ToString());
                }

            }
        }
    }
}
