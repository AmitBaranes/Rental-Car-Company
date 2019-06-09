using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessLayer;
using BL;
using DataAccessLayer;
using System.Web.Http.Cors;
using RentCarApi.Filters;

namespace RentCarApi.Controllers
{
  
  [EnableCors(origins: "*", headers: "*", methods: "*")]
  public class CarsController : ApiController
  {
    //http://localhost:8080/api/cars/getAllCars
    [HttpGet]
    [AllowAnonymous]
    public IHttpActionResult getAllCars()
    {
      try
      {
        List<CarsForRent> cars = BLCars.getAllCars();
        if (cars.Count > 0)
        {
          return Ok(cars);
        }
        else
        {
          return NotFound();
        }
      }
      catch (Exception e)
      {
        return InternalServerError();
      }

    }

    //http://localhost:8080/api/cars/getAllRentCars
    [HttpGet]
    [AllowAnonymous]
    public IHttpActionResult getAllRentCars()
    {
      try
      {
        List<RentCar> rents = BLCars.getAllRentCars();
        if (rents !=null)
        {
          return Ok(rents);
        }
        else
        {
          return NotFound();
        }
      }
      catch (Exception e)
      {
        return InternalServerError();
      }

    }

    //http://localhost:8080/api/cars/getAllRentCars
    [HttpGet]
    [AllowAnonymous]
    public IHttpActionResult getRentCarsByUserID(int userID)
    {
      try
      {
        List<RentCar> rents = BLCars.getRentCarsByUserID(userID);
        if (rents != null)
        {
          return Ok(rents);
        }
          return NotFound();
      }
      catch (Exception e)
      {
        return InternalServerError();
      }

    }


    //http://localhost:8080/api/cars/getAllCarsType
    [HttpGet]
    [AllowAnonymous]
    public IHttpActionResult getAllCarsType()
    {
      try
      {
        List<CarType> types = BLCars.getAllCarsType();
        if (types != null)
        {
          return Ok(types);
        }
        else
        {
          return NotFound();
        }
      }
      catch (Exception e)
      {
        return InternalServerError();
      }
    }

    //http://localhost:8080/api/cars/addCar
    //{"CarNumber": "6884674", "TypeID": 5, "Mileage": 159218, "Proper": "Y", "Available": "N", "BranchID": 1 }
    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult addCar(CarsForRent car)
    {
      bool isCarExists = BLCars.getAllCars().Any(c => c.CarNumber == car.CarNumber);
      if (!isCarExists)
      {
        try
        {
          BLCars.addCarForRent(car);
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "Car rent added successfully"));
        }
        catch (Exception e)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to create new car for rent"));
        }
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "car rent already exist!"));
    }

    // http://localhost:8080/api/cars/addCarType
    // { "Manufacturer": "Suzuki", "Model": "Jimny", "CostPerDay": 20.79, "CostPerDayDelay": 24.50, "Year": "2019", "Gear": "A" }
    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult addCarType(CarType carType)
    {
      var isTypeExists = BLCars.getAllCarsType().FirstOrDefault(car=> car.Manufacturer == carType.Manufacturer || car.Model == carType.Model || car.Year == carType.Year || car.Gear== carType.Gear);
      if (isTypeExists != null)
      {
        try
        {
          BLCars.addCarType(carType);
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "car type added successfully"));
        }
        catch (Exception e)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to add new car type"));
        }
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "car type already exist!"));
    }

    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult addRentOrder(RentCar rent)
    {
      bool isRentExist = BLCars.getAllRentCars().Any(c => c.CarNumber == rent.CarNumber);
      if (!isRentExist)
      {
        try
        {
          BLCars.addRent(rent);
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "rent added successfully"));
        }
        catch (Exception e)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to add rent car"));
        }
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "rent car already exist!"));
    }

    //http://localhost:8080/api/cars/updateCarType
    //{ "Manufacturer": "Toyota", "Model": "Corola", "CostPerDay":0.58, "CostPerDayDelay": 24.50, "Year": "2017", "Gear": "A" }
    [HttpPut]
    [AllowAnonymous]
    public IHttpActionResult updateCarType(CarType carType)
    {
      CarType currentCarType = BLCars.getAllCarsType().FirstOrDefault(c => c.TypeID == carType.TypeID);
      if (currentCarType != null)
      {
         bool isUpdated = BLCars.updateCarType(carType);
          if (isUpdated)
          {
            return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "car type updated successfully"));
          }
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to update car type"));
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "car type does not exist!"));
    }

    //http://localhost:8080/api/cars/updateCarRent
    // {"CarNumber": "124", "TypeID": 1, "Mileage": 99782, "Proper": "Y", "Available": "N", "BranchID": 1}
    [HttpPut]
    [AllowAnonymous]
    public IHttpActionResult updateCarStock(CarsForRent rentCar)
    {
      CarsForRent currentCar = BLCars.getAllCars().FirstOrDefault(c => c.CarNumber == rentCar.CarNumber);
      if (currentCar != null)
      {
         bool isUpdated = BLCars.updateCar(rentCar);
        if (isUpdated)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "car type updated successfully"));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to update car"));
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Car does not exist!"));
    }

    // http://localhost:8080/api/Cars/updateRentCar
    // { "CarNumber": "1", "UserID": 5, "StartTime": "2019-05-05T00:00:00", "EndTime": "2019-05-05T00:00:00", "ReturnTime": "2019-05-10T00:00:00" }
    [HttpPut]
    [AllowAnonymous]
    public IHttpActionResult updateCarOrder(RentCar rent)
    {
      RentCar currentCar = BLCars.getAllRentCars().FirstOrDefault(c => c.CarNumber == rent.CarNumber);
      if (currentCar != null)
      {
        try
        {
          BLCars.updateRentCar(rent, currentCar);
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "car type updated successfully"));
        }
        catch (Exception e)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to update car"));
        }
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Car does not exist"));

    }

    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult deleteCarType(CarType carType)
    {
      bool isCarTypeExists = BLCars.getAllCarsType().Any(type => type.TypeID == carType.TypeID);
      if (isCarTypeExists)
      {
        bool isDeleted = BLCars.deleteCarType(carType);
        if (isDeleted)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "car type deleted successfully"));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to delete car type"));
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Car type does not exist"));
    }

    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult deleteCarForRent(CarsForRent carRent)
    {
      bool isCarTypeExists = BLCars.getAllCars().Any(c => c.CarNumber == carRent.CarNumber);
      if (isCarTypeExists)
      {
        bool isDeleted = BLCars.deleteCarForRent(carRent);
        if (isDeleted)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "Rent car deleted successfully"));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to delete car type"));
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Car does not exist"));
    }

    [HttpPost]
    [AllowAnonymous]
    public IHttpActionResult deleteCarOrder(RentCar rent)
    {
      bool isCarTypeExists = BLCars.getAllRentCars().Any(c => c.CarNumber == rent.CarNumber);
      if (isCarTypeExists)
      {
        bool isDeleted = BLCars.deleteRentCar(rent);
        if (isDeleted)
        {
          return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.OK, "Rent car deleted successfully"));
        }
        return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Failed to delete car type"));
      }
      return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Car does not exist"));
    }
  }
}
