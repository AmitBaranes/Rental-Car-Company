using System;
using System.Collections.Generic;
using System.Linq;
using DataAccessLayer;
using System.Data.Entity;
using BL;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace BusinessLayer
{
  public class BLUsers
  {

    private static string Encrypt(string clearText, string EncryptionKey)
    {
      byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
      using (Aes encryptor = Aes.Create())
      {
        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        encryptor.Key = pdb.GetBytes(32);
        encryptor.IV = pdb.GetBytes(16);
        using (MemoryStream ms = new MemoryStream())
        {
          using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
          {
            cs.Write(clearBytes, 0, clearBytes.Length);
            cs.Close();
          }
          clearText = Convert.ToBase64String(ms.ToArray());
        }
      }
      return clearText;
    }

    private static string Decrypt(string cipherText, string EncryptionKey)
    {
      byte[] cipherBytes = Convert.FromBase64String(cipherText);
      using (Aes encryptor = Aes.Create())
      {
        Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
        encryptor.Key = pdb.GetBytes(32);
        encryptor.IV = pdb.GetBytes(16);
        using (MemoryStream ms = new MemoryStream())
        {
          using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
          {
            cs.Write(cipherBytes, 0, cipherBytes.Length);
            cs.Close();
          }
          cipherText = Encoding.Unicode.GetString(ms.ToArray());
        }
      }
      return cipherText;
    }

    public static List<User> getAllUsers()
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        return db.Users.ToList();
      }
    }

    public static List<User> getUsersByRole(char roleType)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        return db.Users.Where(user => user.RoleType.ToString() == roleType.ToString()).ToList();
      }
    }

    public static void addUser(User userInfo)
    {
      userInfo.Password = Encrypt(userInfo.Password, userInfo.Email);
      //string Decrypted = Decrypt(Encrypted, EncryptionKey);
      using (CarRentEntities db = new CarRentEntities())
      {
        db.Users.Add(userInfo);
        db.SaveChanges();
      }
    }

    public static bool DeleteUser(string ID)
    {
      bool isDeleted;

      try
      {
        using (CarRentEntities db = new CarRentEntities())
        {
          User user = db.Users.FirstOrDefault(u => u.ID == ID);
          if (user != null)
          {
            db.Users.Remove(user);
            db.SaveChanges();
            isDeleted = true;
          }
          else
          {
            isDeleted = false;
          }
        }

      }
      catch (Exception e)
      {
        isDeleted = false;
      }

      return isDeleted;
    }

    public static bool updateUser(User user)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        User currentUser = db.Users.FirstOrDefault(u => u.ID == user.ID);
        if (currentUser != null)
        {
          db.Entry(currentUser).State = System.Data.Entity.EntityState.Detached;
          int userId = currentUser.UserID;
          currentUser = user;
          currentUser.UserID = userId;
          db.Entry(currentUser).State = System.Data.Entity.EntityState.Modified;
          db.SaveChanges();
          return true;
        }
        else
        {
          return false;
        }
      }


    }

    public static bool isAuthenticated(string email,string password)
    {
      using (CarRentEntities db = new CarRentEntities())
      {
        User isUserExists = db.Users.FirstOrDefault(u => u.Email == email);
        if (isUserExists != null)
        {
          //string encryptPass = Encrypt(password, email);
          string decryptedPassword = Decrypt(isUserExists.Password, email);
          if (decryptedPassword == password)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        return false;
      }
    }
  }
}
