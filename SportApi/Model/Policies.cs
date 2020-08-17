using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SportApi.Model
{
    public class Policies
    {
        public const string SuperAdmin = "SuperAdmin";
        public const string Admin = "Admin";
        public const string FullJournalist = "FullJournalist";
        public const string CustomJournalist = "CustomJounrnalist";
        public const string All = SuperAdmin +","+ Admin + "," + FullJournalist + "," + CustomJournalist;
        public const string AllAdmin = SuperAdmin + "," + Admin;
        public const string AllWithoutAdmin = SuperAdmin + "," + FullJournalist + "," + CustomJournalist;

        public static AuthorizationPolicy FullAdminPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(SuperAdmin).Build();
        }
        public static AuthorizationPolicy AdminPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Admin).Build();
        }
        public static AuthorizationPolicy FullJournalistPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(FullJournalist).Build();
        }
        public static AuthorizationPolicy CustomJournalistPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(CustomJournalist).Build();
        }
    }
}
