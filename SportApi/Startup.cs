using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;
using SportApi.Errors;
using SportDatabase;
using SportDatabase.Interface;
using SportDatabase.Repository;
using Microsoft.EntityFrameworkCore;
using SportDatabase.Model;
using SportDatabase.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SportApi.Model;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.Server.IISIntegration;

namespace SportApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddDbContext<SportNewsContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Database")),
                ServiceLifetime.Transient);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.RequireHttpsMetadata = false;
                    option.SaveToken = true;
                    option.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],
                        ValidAudience = Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:SecretKey"])),
                        ClockSkew = TimeSpan.Zero
                    };
                    //services.AddCors()

                    IdentityModelEventSource.ShowPII = true;// potem delete
                });
            services.AddAuthorization(configure =>
            {
                configure.AddPolicy(Policies.SuperAdmin, Policies.FullAdminPolicy());
                configure.AddPolicy(Policies.Admin, Policies.AdminPolicy());
                configure.AddPolicy(Policies.Dziennikarz, Policies.FullJournalistPolicy());
                configure.AddPolicy(Policies.CustomJournalist, Policies.CustomJournalistPolicy());
            });

            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowOrigin",
            //    builder =>
            //    {
            //        builder.WithOrigins("http://localhost:4200")
            //                            .AllowAnyHeader()
            //                            .AllowAnyMethod()
            //                            .AllowCredentials();
            //    });
            //}); ;
            services.AddControllers().AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new IntToStringConverter())); ;
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseCors(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod()
                                            .AllowCredentials();
                    });

                app.UseDeveloperExceptionPage();            
            }
            app.UseExceptionHandler("/Error");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowOrigin");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //app.UseMiddleware<ErrorHandler>();
            app.UseStatusCodePages();


            //depency injection
            //var container = new Container();
            /*container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            container.Register(typeof(IRepository<>), typeof(Repository<>));
            container.Register<IUnitOfWork, UnitOfWork>();*/
            /*container.Verify(); 
             * GlobalConfiguration.Configuration.DependencyResolver =
        new SimpleInjectorWebApiDependencyResolver(container);
           
 */
            //
     
            

            var forwardingOptions = new ForwardedHeadersOptions() { ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.All }; app.UseForwardedHeaders(forwardingOptions);
        }
    }
}
