using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;

namespace EnglishSchool.WebUI.Services
{
    public class ZoomService
    {
        private readonly HttpClient _httpClient;
        private readonly string _jwtToken;
        private const string _apiKey = "AbheMQCGRH6hz4KfLagyPQ";
        private const string _apiSecret = "34afuErjeSEPOZiFGuUEkVJWQenmIBY2PDkx";

        public ZoomService()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.zoom.us/v2/");
            _jwtToken = GenerateToken(_apiKey, _apiSecret);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _jwtToken);
        }

        public async Task<string> CreateMeeting(string topic, DateTime startDateTime, int durationInMinutes, string password = null)
        {
            var request = new
            {
                topic = topic,
                type = 2,
                start_time = startDateTime.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                duration = durationInMinutes,
                password = password
            };

            var requestBody = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("users/me/meetings", requestBody);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Failed to create Zoom meeting: {response.StatusCode}");
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<JObject>(responseContent);

            return responseObject["join_url"].ToString();
        }
        public string GenerateToken(string apiKey, string apiSecret)
        {
            var claims = new[]
            {
                new Claim("iss", apiKey),
                new Claim("exp", DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeSeconds().ToString()),
            };

            var token = new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(apiSecret)),
                    SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
