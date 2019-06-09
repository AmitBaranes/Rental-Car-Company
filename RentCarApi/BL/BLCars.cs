using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using System.Data.Entity;

namespace BL
{
  public class BLCars
  {

    public static List<CarsForRent> getAllCars()
    {
      using (CarRentEntities db = new CarRentEntities())
      {

        List<CarsForRent> allCars = db.CarsForRents.ToList();
        return allCars;
      }
    }

    public static List<CarType> getAllCarsType()
    {
      using (CarRentEntities db = new CarRentEntities())
      {

        List<CarType> allTypes = db.CarTypes.ToList();
        return allTypes;
      }
    }

    public static List<RentCar> getAllRentCars()
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        List<RentCar> rents = db.RentCars.ToList();
        return rents;
      }
    }

    public static List<RentCar> getRentCarsByUserID(int userID)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        List<RentCar> rents = db.RentCars.Where(order=>order.UserID == userID).ToList();
        return rents;
      }
    }

    public static bool addCarType(CarType carType)
    {
      using(CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.CarTypes.Add(carType);
          db.SaveChanges();
          return true;
        }
        catch
        {
          return false;
        }
      }
    }

    public static bool addCarForRent(CarsForRent carForRent)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.CarsForRents.Add(carForRent);
          db.SaveChanges();
          return true;
        }
        catch
        {
          return false;
        }
      }
    }

    public static bool addRent(RentCar rent)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.RentCars.Add(rent);
          db.SaveChanges();
          return true;
        }
        catch
        {
          return false;
        }
      }
    }

    public static bool updateCarType(CarType carType)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.CarTypes.Add(carType);
          db.Entry(carType).State = System.Data.Entity.EntityState.Modified;
          db.SaveChanges();
          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
    }

    public static bool updateCar(CarsForRent carRent)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.CarsForRents.Add(carRent);
          db.Entry(carRent).State = System.Data.Entity.EntityState.Modified;
          db.SaveChanges();
          return true;
        }
        catch
        {
          return false;
        }
      }
    }

    public static bool updateRentCar(RentCar rent, RentCar currentRent)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.Entry(currentRent).State = System.Data.Entity.EntityState.Detached;
          string CarNumber = currentRent.CarNumber;
          int userID = currentRent.UserID;
          currentRent = rent;
          currentRent.UserID = userID;
          currentRent.CarNumber = CarNumber;
          db.Entry(currentRent).State = System.Data.Entity.EntityState.Modified;
          db.SaveChanges();
          return true;
        }
        catch
        {
          return false;
        }
      }
    }

    public static bool deleteCarType(CarType carType)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.CarTypes.Attach(carType);
          db.Entry(carType).State = EntityState.Deleted;
          db.SaveChanges();
          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
    }

    public static bool deleteCarForRent(CarsForRent carRent)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.CarsForRents.Attach(carRent);
          db.Entry(carRent).State = EntityState.Deleted;
          db.SaveChanges();
          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
    }

    public static bool deleteRentCar(RentCar rent)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        try
        {
          db.RentCars.Attach(rent);
          db.Entry(rent).State = EntityState.Deleted;
          db.SaveChanges();
          return true;
        }
        catch (Exception e)
        {
          return false;
        }
      }
    }


  }

}
