using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapGet("/", () => "RideOn API running");

record User(string Id, string Email);
record Vehicle(string Id, string Model, string Location, decimal PricePerDay);
record BookingRequest(string VehicleId, string UserId, DateTime StartDate, DateTime EndDate);

var vehicles = new List<Vehicle>
{
    new("1", "Honda Wave", "Hanoi", 100),
    new("2", "Yamaha Exciter", "Ho Chi Minh City", 150),
};

var bookings = new List<object>();

app.MapPost("/auth/login", (string email, string password) =>
{
    return Results.Ok(new { token = "fake-token", user = new User("1", email) });
});

app.MapPost("/auth/register", (string email, string password) =>
{
    return Results.Ok(new { token = "fake-token", user = new User("1", email) });
});

app.MapGet("/vehicles", () => vehicles);

app.MapGet("/vehicles/{id}", (string id) =>
{
    var vehicle = vehicles.FirstOrDefault(v => v.Id == id);
    return vehicle is not null ? Results.Ok(vehicle) : Results.NotFound();
});

app.MapPost("/bookings", (BookingRequest request) =>
{
    var booking = new
    {
        Id = Guid.NewGuid().ToString(),
        request.VehicleId,
        request.UserId,
        request.StartDate,
        request.EndDate
    };
    bookings.Add(booking);
    return Results.Ok(booking);
});

app.Run();
