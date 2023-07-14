using Microsoft.Extensions.Options;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FrameMates_Admin_UI.Helpers
{
    class JavaNamingPolicy : JsonNamingPolicy
    {
        public override string ConvertName(string name)
        {
            if (string.IsNullOrEmpty(name))
                return name;

            return char.ToLowerInvariant(name[0]) + name.Substring(1);
        }
    }
    public class JsonHelper<T>
    {
        private readonly JsonSerializerOptions jsonCsharpConventionToJavaOptions;
        private readonly JsonSerializerOptions jsonJavaConventionToCsharpOptions;
        public JsonHelper()
        {
            jsonCsharpConventionToJavaOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                IgnoreNullValues = true
            };
            jsonJavaConventionToCsharpOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = new JavaNamingPolicy(),
                IgnoreNullValues = true
            };
        }

        public T ToModel(string json) => JsonSerializer.Deserialize<T>(json, jsonCsharpConventionToJavaOptions);
    }
}
