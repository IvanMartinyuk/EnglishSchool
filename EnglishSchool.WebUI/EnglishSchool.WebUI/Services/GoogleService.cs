using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EnglishSchool.WebUI.Services
{
    public class GoogleService
    {        
        private const string _applicationName = "EnglishSchool";

        public async Task<string> CreateMeet(string summary, DateTime startTime, DateTime endTime)
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            GoogleCredential credential = GoogleCredential.FromFile(currentDirectory + "\\englishschool-credentials.json")
                .CreateScoped(CalendarService.Scope.CalendarEvents);

            // Create the Calendar API service using the credentials
            CalendarService service = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = _applicationName
            });

            // Create a new event
            Event newEvent = new Event()
            {
                Summary = summary,
                Start = new EventDateTime()
                {
                    DateTime = startTime,
                    TimeZone = "UTC",
                },
                End = new EventDateTime()
                {
                    DateTime = endTime,
                    TimeZone = "UTC",
                },
                ConferenceData = new ConferenceData()
                {
                    CreateRequest = new CreateConferenceRequest()
                    {
                        ConferenceSolutionKey = new ConferenceSolutionKey()
                        {
                            Type = "hangoutsMeet"
                        },
                        RequestId = Guid.NewGuid().ToString()
                    }
                },
                Reminders = new Event.RemindersData()
                {
                    UseDefault = true
                }
            };

            string calendarId = "primary";
            EventsResource.InsertRequest request = service.Events.Insert(newEvent, calendarId);
            Event createdEvent = await request.ExecuteAsync();

            if (createdEvent.ConferenceData == null)
            {
                return "Error: Meeting was not created.";
            }
            string uri = createdEvent.ConferenceData.EntryPoints.First().Uri;
            return uri;
        }

    }
}
