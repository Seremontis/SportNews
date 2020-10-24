using Microsoft.AspNetCore.Authorization;

namespace SportApi.Model
{
    public class Policies
    {
        public const string SuperAdmin = "SuperAdmin";
        public const string Admin = "Admin";
        public const string Dziennikarz = "Dziennikarz";
        public const string CustomJournalist = "Dziennikarz ograniczone uprawnienia";
        public const string All = SuperAdmin +","+ Admin + "," + Dziennikarz + "," + CustomJournalist;
        public const string AllAdmin = SuperAdmin + "," + Admin;
        public const string AllWithoutAdmin = SuperAdmin + "," + Dziennikarz + "," + CustomJournalist;

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
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Dziennikarz).Build();
        }
        public static AuthorizationPolicy CustomJournalistPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(CustomJournalist).Build();
        }
    }
}
