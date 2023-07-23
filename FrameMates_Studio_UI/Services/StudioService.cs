using FrameMates_Admin_UI.Helpers;
using FrameMates_Studio_UI.Exceptions;
using FrameMates_Studio_UI.Models;
using System;

namespace FrameMates_Studio_UI.Services
{
    public class StudioService
    {
        private readonly IConfiguration _configuration;
        private readonly string studioController;
        public StudioService(IConfiguration configuration)
        {
            _configuration = configuration;
            studioController = _configuration["apiDomain"] + "api/studios";
        }

        
        public async Task<Studio> GetCurrentStudio(string accessToken)
        {
            if(accessToken == null) 
            {
                throw new InvalidJwtException();
            }
            using (HttpClient client = new HttpClient())
            {
                string apiUrl = studioController + "/current-owner";
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                var responseMessage = await response.Content.ReadAsStringAsync();
                var studioParser = new JsonHelper<Studio>();
                if (response.IsSuccessStatusCode)
                {
                    return studioParser.ToModel(responseMessage);

                }
                else
                {
                    if((int)response.StatusCode == 401)
                    {
                        throw new InvalidJwtException();
                    }
                    await Console.Out.WriteLineAsync(responseMessage);
                    return null;
                }
            }
        }
    }
}
