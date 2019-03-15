using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PariwisataWamena.Services
{
    public class EmailServices : IdentityDbContext
    {
        public EmailServices(DbContextOptions options) : base(options)
        {
        }

        protected EmailServices()
        {
        }

         public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            try
            {
                string email = "ocph23.test@gmail.com";
                string password = "Sony@7777";
                var loginInfo = new NetworkCredential(email, password);
                var msg = new MailMessage();
                var smtpClient = new SmtpClient("smtp.gmail.com", 587);

                msg.From = new MailAddress(email);
                msg.To.Add(new MailAddress(message.Destination));
                msg.Subject = message.Subject;
                msg.Body = message.Body;
                msg.IsBodyHtml = true;

                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Credentials = loginInfo;

                smtpClient.Send(msg);
            }
            catch (Exception ex)
            {

                throw new SystemException(ex.Message);
            }

            return Task.FromResult(0);
        }
    }
}

