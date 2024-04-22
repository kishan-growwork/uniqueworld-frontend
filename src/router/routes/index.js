import { lazy } from "react";

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/";

// ** Merge Routes
const Routes = [
  // {
  //   path: '/',
  //   exact: true,
  //   component: lazy(() => import('../../views/Pages/LandingPage/LandingPage')),
  //   permission: ["Admin", "Team Leader", "BDM", "Recruiter", "Public"]
  // },
  {
    path: "/:slug/dashboard",
    exact: true,
    component: lazy(() => import("../../views/Pages/dashboard")),
    permission: ["Admin", "Team Leader", "BDM", "Recruiter"],
  },
  {
    path: "/superadmin/dashboard",
    exact: true,
    component: lazy(() =>
      import("../../views/Pages/superAdminPages/DashBoard")
    ),
    permission: ["SuperAdmin"],
  },
  {
    path: "/superadmin/agency",
    exact: true,
    component: lazy(() => import("../../views/Pages/superAdminPages/Agency")),
    permission: ["SuperAdmin"],
  },
  {
    path: "/superadmin/profile",
    exact: true,
    component: lazy(() => import("../../views/Pages/superAdminPages/ProfilePage.js")),
    permission: ["SuperAdmin"],
  },
  {
    path: "/:slug/candidate",
    exact: true,
    component: lazy(() => import("../../views/Pages/candidate")),
    permission: ["Admin", "Team Leader", "Recruiter", "BDM", "Client"],
  },
  {
    path: "/:slug/best-matches",
    exact: true,
    component: lazy(() => import("../../views/Pages/CandidateBestMatches.js")),
    permission: ["Client"],
  },
  // {
  //   path: "/login",
  //   exact: true,
  //   component: lazy(() => import("../../views/Pages/Login")),
  //   permission: ["Admin", "Team Leader", "Public", "Recruiter", "BDM", "Client"],
  //   layout: "BlankLayout",
  //   meta: {
  //     authRoute: true,
  //   },
  // },
  {
    path: "/superadmin/login",
    exact: true,
    component: lazy(() => import("../../views/Pages/superAdminPages/Login")),
    permission: ["SuperAdmin"],
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/:slug/clients",
    exact: true,
    component: lazy(() => import("../../views/Pages/Clients")),
    permission: ["Admin", "BDM"],
  },
  {
    path: "/:slug/onboarding",
    exact: true,
    component: lazy(() => import("../../views/Pages/OnBoarding")),
    permission: ["Admin", "Team Leader", "BDM", "Recruiter"],
  },
  {
    path: "/:slug/jobopening",
    exact: true,
    component: lazy(() => import("../../views/Pages/JobOpening")),
    permission: ["Client"],
  },
  {
    path: "/:slug/jobopening-match/:id",
    exact: true,
    component: lazy(() => import("../../views/Pages/JobOpeningMatches.js")),
    permission: ["Client"],
  },
  {
    path: "/superadmin/jobCategory",
    exact: true,
    component: lazy(() => import("../../views/Pages/jobCategory")),
    permission: ["SuperAdmin"],
  },
  {
    path: "/superadmin/industries",
    exact: true,
    component: lazy(() => import("../../views/Pages/Industries")),
    permission: ["SuperAdmin"],
  },
  {
    path: "/:slug/interview",
    exact: true,
    component: lazy(() => import("../../views/Pages/Interview")),
    permission: ["Admin", "Team Leader", "BDM", "Recruiter"],
  },
  {
    path: "/:slug/clientFeedback",
    exact: true,
    component: lazy(() => import("../../views/Pages/FeedBack")),
    permission: ["Admin", "Team Leader", "BDM"],
  },
  {
    path: "/:slug/lead",
    exact: true,
    component: lazy(() => import("../../views/Pages/Lead")),
    permission: ["Admin", "BDM"],
  },
  {
    path: "/:slug/users",
    exact: true,
    component: lazy(() => import("../../views/Pages/user")),
    permission: ["Admin"],
  },
  {
    path: "/:slug/hot-vacancy",
    exact: true,
    component: lazy(() => import("../../views/Pages/HotVacancy.js")),
    permission: ["Admin"],
  },
  {
    path: "/forgotpassword",
    exact: true,
    component: lazy(() =>
      import("../../components/Forms/Login/ForgotPassword")
    ),
    layout: "BlankLayout",
    permission: ["Admin", "Team Leader", "Public"],
  },
  {
    path: "/:slug/hire",
    exact: true,
    component: lazy(() => import("../../views/Pages/Hire")),
    permission: ["Client"],
  },
  {
    path: "/:slug/documentation",
    exact: true,
    component: lazy(() => import("../../views/Pages/HrDocumantation")),
    permission: ["Client"],
  },
  {
    path: "/:slug/pricing",
    exact: true,
    component: lazy(() => import("../../views/Pages/pricing/index")),
    permission: ["Client"],
  },
  {
    path: "/:slug/saved-candidates",
    exact: true,
    component: lazy(() => import("../../views/Pages/Saved_Candidates")),
    permission: ["Client"],
  },
  {
    path: "/:slug/profile",
    exact: true,
    component: lazy(() => import("../../views/Pages/Profile")),
    permission: ["Admin", "Team Leader", "BDM", "Recruiter", "Client"],
  },
  {
    path: "/error",
    exact: true,
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout",
    permission: [
      "Admin",
      "Team Leader",
      "Public",
      "BDM",
      "Recruiter",
      "Client",
    ],
  },
  {
    path: "/:slug/candidate/apply",
    exact: true,
    component: lazy(() => import("../../views/Pages/PublicCandidate")),
    layout: "BlankLayout",
    permission: ["Admin", "Team Leader", "Public", "BDM", "Recruiter"],
  },
  {
    path: "/:slug/client-registration",
    exact: true,
    component: lazy(() => import("../../views/Pages/PublicClient")),
    layout: "BlankLayout",
    permission: ["Admin", "Team Leader", "Public", "BDM", "Recruiter"],
  },

  {
    path: "/resetpassword",
    exact: true,
    component: lazy(() => import("../../views/Pages/ResetPassword")),
    layout: "BlankLayout",
    permission: ["Admin", "Team Leader", "Public", "BDM", "Recruiter"],
  },
];

export { DefaultRoute, TemplateTitle, Routes };
