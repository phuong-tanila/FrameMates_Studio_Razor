using FrameMates_Admin_UI.Helpers;
using FrameMates_Studio_UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;

namespace FrameMates_Studio_UI.Pages
{
    public class FeedbackModel : PageModel
    {
        private readonly IConfiguration _configuration;


        public List<Order> Orders { get; set; }
        public string ApiDomain { get; private set; }

        public FeedbackModel(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task OnGetAsync()
        {
            ApiDomain = _configuration["apiDomain"];
            var tmpOrders = new List<Order>();

            using (HttpClient client = new HttpClient())
            {
                var accessToken = Request.Cookies["accessToken"];
                if (accessToken == null) Response.Redirect("/Logout");
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                var apiUrl = ApiDomain + "api/orders/feedback/current-studio";

                HttpResponseMessage response = await client.GetAsync(apiUrl);
                string responseBody = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    var jsonHelper = new JsonHelper<List<Order>>();
                    tmpOrders = jsonHelper.ToModel(responseBody);

                    foreach (var o in tmpOrders)
                    {
                        HttpClient client2 = new HttpClient();
                        apiUrl = ApiDomain + "api/order-details/feedback/order/" + o.OrderId;
                        var orderDetailParser = new JsonHelper<List<OrderDetail>>();
                        response = await client2.GetAsync(apiUrl);
                        responseBody = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(responseBody);
                        if (response.IsSuccessStatusCode)
                        {
                            o.OrderDetails = orderDetailParser.ToModel(responseBody);
                            await Console.Out.WriteLineAsync("");
                        }
                        else
                        {
                            Console.Write(response.StatusCode.ToString());
                            Console.Write(responseBody);
                        }
                    }
                    Orders = tmpOrders;
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
