import {
  AlignJustify,
  BookOpen,
  Briefcase,
  FilePlus,
  Home,
  MessageCircle,
  Share2,
  User,
  UserCheck,
  Users,
  CreditCard,
  Anchor,
  GitPullRequest,
} from "react-feather";

export default [
  {
    id: "home",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: `/dashboard`,
    permission: ["Admin", "Team Leader", "BDM", "Recruiter"],
  },
  {
    id: "home",
    title: "Dashboard",
    icon: <Home size={20} />,
    navLink: "/superadmin/dashboard",
    permission: ["SuperAdmin"],
  },
  {
    id: "agency",
    title: "Agency",
    icon: <Anchor size={20} />,
    navLink: "/superadmin/agency",
    permission: ["SuperAdmin"],
  },
  {
    id: "secondPage",
    title: "Candidate",
    icon: <User size={20} />,
    navLink: `/candidate`,
    permission: ["Admin", "Team Leader", "Recruiter", "BDM", "Client"],
  },
  {
    id: "secondPage",
    title: "Best Matches",
    icon: <User size={20} />,
    navLink: `/best-matches`,
    permission: ["Client"],
  },
  {
    id: "Job Opening",
    title: "Job Opening",
    icon: <Home size={20} />,
    navLink: "/jobopening",
    permission: ["Client"],
  },
  {
    id: "hire",
    title: "Hired",
    icon: <UserCheck size={20} />,
    navLink: "/hire",
    permission: ["Client"],
  },
  {
    id: "On Boarding",
    title: "On Boarding",
    icon: <BookOpen size={20} />,
    navLink: `/onboarding`,
    permission: ["Admin", "Team Leader", "BDM", "Recruiter"],
  },
  {
    id: "JobCategory",
    title: "Job Category",
    icon: <AlignJustify size={20} />,
    navLink: `/superadmin/jobCategory`,
    permission: ["SuperAdmin"],
  },
  {
    id: "Hot Vacancy",
    title: "Hot Vacancy",
    icon: <GitPullRequest size={20} />,
    navLink: `/hot-vacancy`,
    permission: ["Admin"],
  },
  {
    id: "Industries",
    title: "Industries",
    icon: <MessageCircle size={20} />,
    navLink: `/superadmin/industries`,
    permission: ["SuperAdmin"],
  },
  {
    id: "Transaction",
    title: "TransactionList",
    icon: <MessageCircle size={20} />,
    navLink: `/superadmin/transactionlist`,
    permission: ["SuperAdmin"],
  },
  {
    id: "Interview",
    title: "Interview",
    icon: <UserCheck size={20} />,
    navLink: `/interview`,
    permission: ["Admin", "Team Leader", "BDM", "Recruiter"],
  },
  {
    id: "Client Feedback",
    title: "Client Feedback",
    icon: <MessageCircle size={20} />,
    navLink: `/clientFeedback`,
    permission: ["Admin", "Team Leader", "BDM"],
  },
  {
    id: "Lead",
    title: "Lead",
    icon: <Share2 size={20} />,
    navLink: `/lead`,
    permission: ["Admin", "BDM"],
  },
  {
    id: "User",
    title: "Users",
    icon: <Users size={20} />,
    navLink: `/users`,
    permission: ["Admin"],
  },
  {
    id: "clients",
    title: "Clients",
    icon: <Briefcase size={20} />,
    navLink: `/clients`,
    permission: ["Admin", "BDM"],
  },
  {
    id: "Transaction",
    title: "TransactionList",
    icon: <MessageCircle size={20} />,
    navLink: `/transactionlist`,
    permission: ["Admin"],
  },
  {
    id: "HRDocumentation",
    title: "HR Documentation",
    icon: <FilePlus size={20} />,
    navLink: "/documentation",
    permission: ["Client"],
  },
  {
    id: "Saved-Candidates",
    title: "Saved Candidates",
    icon: <User size={20} />,
    navLink: "/saved-candidates",
    permission: ["Client"],
  },
  {
    id: "Price",
    title: "Price",
    icon: <CreditCard size={20} />,
    navLink: "/pricing",
    permission: ["Client"],
  },
];
