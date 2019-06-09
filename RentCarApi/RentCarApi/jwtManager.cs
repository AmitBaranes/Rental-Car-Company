using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace RentCarApi
{
  public static class jwtManager
  {
    /// <summary>
    /// Use the below code to generate symmetric Secret Key
    ///     var hmac = new HMACSHA256();
    ///     var key = Convert.ToBase64String(hmac.Key);
    /// </summary>
    private const string Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";

    public static string GenerateToken(string userID, string userName, string role, int expireHours = 24)
    {
      var symmetricKey = Convert.FromBase64String(Secret);
      var tokenHandler = new JwtSecurityTokenHandler();

      var now = DateTime.UtcNow;
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
                  {
                            new Claim("userID", userID),
                            new Claim("userName", userName),
                            new Claim("role", role),
                        }),

        Expires = now.AddHours(Convert.ToInt32(expireHours)),

        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature)
      };

      SecurityToken stoken = tokenHandler.CreateToken(tokenDescriptor);
      string token = tokenHandler.WriteToken(stoken);

      return token;
    }

    public static ClaimsPrincipal GetPrincipal(string token)
    {
      try
      {
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

        if (jwtToken == null)
          return null;

        var symmetricKey = Convert.FromBase64String(Secret);

        var validationParameters = new TokenValidationParameters()
        {
          RequireExpirationTime = true,
          ValidateIssuer = false,
          ValidateAudience = false,
          IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
        };

        SecurityToken securityToken;
        var principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

        return principal;
      }

      catch (Exception)
      {
        return null;
      }
    }
  }
}