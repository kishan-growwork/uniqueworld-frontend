/*eslint-disable*/
import DataTable from "react-data-table-component";
import Marquee from "react-fast-marquee";
import {
  Edit,
  Delete,
  FileText,
  Image,
  UserCheck,
  Trash,
  Share,
  Search,
  Filter as FilterIcon,
  MessageCircle,
  Star,
  Eye,
  UserPlus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  Clock,
  MapPin,
  DollarSign,
  Briefcase,
  User,
  Trash2,
} from "react-feather";
import {
  CardImg,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { MoreVertical } from "react-feather";
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { CardBody, CardText, CardTitle, CardHeader } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Component, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Candidate from "../../components/Dialog/Candidate";
import CandidateActions from "../../redux/candidate/actions";
import CustomHeader from "../../components/Header/CustomHeader";
import Filter from "../../components/Forms/Candidates/Filter";
import { tostify } from "../../components/Tostify";
import { useHistory, useLocation } from "react-router-dom";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";
import ReactCanvasConfetti from "react-canvas-confetti";
import clientactions from "../../redux/client/actions";
// import { uploadFiles } from './../../helper/fileUpload'
import Loader from "../../components/Dialog/Loader";
import whatsapp from "../../assets/images/whatsapp.png";
import { awsUploadAssetsWithResp } from "../../helper/awsUploadAssets";
import moment from "moment/moment";
import subscriptionActions from "../../redux/subscription/actions";
import authActions from "../../redux/auth/actions";
import actions from "../../redux/client/actions";
import userActions from "../../redux/user/actions";
import Rating from "react-rating";
import img from "../../assets/images/icons/annucment.png";
import useBreakpoint from "../../utility/hooks/useBreakpoints";
import { allAccessEmail } from "../../constant/constant";
import jobcategoryActions from "./../../redux/jobCategory/actions";
import industriesActions from "./../../redux/industries/actions";
import WhatsappDialog from "../../components/Dialog/WhatsappDialog";
import _ from "lodash";
import maleIcon from "../../../src/assets/images/icons/male-icon.jpg";
import FemaleIcon from "../../../src/assets/images/icons/female-icon.jpg";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const SecondPage = ({
  isSavedCandidates = false,
  bestMatchesCandidate = false,
}) => {
  const { width } = useBreakpoint();
  const colRef = useRef(null);
  const history = useHistory();
  const params = useLocation();
  // const { isSent, isNotSent } = useSelector(state => state.candidate)
  const dispatch = useDispatch();
  const location = useLocation().search;
  const auth = useSelector((state) => state?.auth);
  const { client } = useSelector((state) => state);
  const {
    currentPlan,
    currentSubscription,
    isLoading,
    resumeCountFinishError,
  } = useSelector((state) => state?.subscription);
  const count = useSelector(
    (state) => state?.subscription?.currentSubscription
  );
  const clientUser = useSelector((state) => state?.auth?.user);
  const { user } = useSelector((state) => state.auth);
  const candidateId = new URLSearchParams(location).get("id");
  const [show, setShow] = useState(false);
  const candidates = useSelector((state) => state.candidate);
  const { bestMatchesCandidates } = useSelector((state) => state.candidate);
  const { getSavedCandidateLoader } = useSelector((state) => state.candidate);
  const [candidate, setCandidate] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [animation, setAnimation] = useState(false);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [industriesData, setIndustriesData] = useState([]);
  const [email, setEmail] = useState("");
  const [filterData, setFilterData] = useState({});
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterToggleMode, setFilterToggleMode] = useState(false);
  const [candidateList, setCandidateList] = useState();
  const [popUp, setPopUp] = useState(false);
  const [promiseLoading, setPromiseLoading] = useState(false);

  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [WPnumber, setWPnumber] = useState();
  const [filterJobCategory, setFilterJobCategory] = useState([]);
  const [jobCategoryId, setJobCategoryId] = useState([]);
  const [isPlanExpireModalOpen, setIsPlanExpireModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(
    candidates?.results?.map(() => false) ?? []
  );
  const slug = localStorage.getItem("slug");
  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDisabledAllFields, setIsDisabledAllFields] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showWPModal, setShowWPModal] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);

  // useLayoutEffect(() => {
  //   // if (bestMatchesCandidate) {
  //     dispatch({
  //       type: CandidateActions.SET_CANDIDATE,
  //       payload: [],
  //     });
  //   // }
  // }, [isBestMatches])

  const toggle = (index) => {
    const newCollapseStates = [...isOpen];
    newCollapseStates[index] = !newCollapseStates[index];
    setIsOpen(newCollapseStates);
  };
  useEffect(() => {
    if (user?.clients?.id) {
      dispatch({
        type: userActions.GET_LOGIN_USER_DETAIL,
        payload: user?.id,
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch({
        type: industriesActions.GET_ALL_INDUSTRIES,
      });
      await dispatch({
        type: jobcategoryActions.GET_ALL_JOBCAT,
      });
    })();
  }, []);

  // useEffect(() => {
  //   if (
  //     client?.msg == "success" &&
  //     client?.isOpenInterviewReqSentPopup == true
  //   ) {
  //     setPopUp(true);
  //     setLoading(false);
  //     setTimeout(() => {
  //       dispatch({
  //         type: actions.INTERVIEW_REQUEST_POPUP,
  //         payload: false,
  //       });
  //       setPopUp(false);
  //     }, 5000);
  //   } else {
  //     setPopUp(false);
  //   }
  // }, [client]);

  useEffect(() => {
    if (candidates?.msg) {
      setIsPlanExpireModalOpen(true);
    }
  }, [candidates]);

  useEffect(() => {
    if (candidates?.results && bestMatchesCandidate == false) {
      setCandidateList(candidates?.results);
      setLoading(false);
    }
  }, [candidates?.results]);

  useEffect(() => {
    if (bestMatchesCandidates?.results && bestMatchesCandidate == true) {
      setCandidateList(bestMatchesCandidates?.results);
      setLoading(false);
    }
  }, [bestMatchesCandidates]);

  const getCandidates = async (page) => {
    setLoading(true);
    const data = filterData;
    if (auth?.user?.clients?.id) {
      const industriesId = [];
      // data.interviewStatus = "available"
      data.userId = auth?.user?.id;
      auth?.user?.clients?.industries_relation?.map((ele) => {
        industriesId.push(ele?.industriesId);
        data.industriesId = industriesId;
      });
      if (!filterData?.jobCategoryId) {
        const jobCategoryId = [];
        auth?.user?.clients?.jobCategory_relation?.map((ele) => {
          jobCategoryId.push(ele?.jobCategoryId);
          data.jobCategoryId = jobCategoryId;
        });
      }
      // if (filterJobCategory?.length > 0) {
      //   data.filterJobCategoryId = filterJobCategory;
      //   // delete data.jobCategoryId;
      // }
    } else {
      if (jobCategoryId.length > 0) {
        data.jobCategoryId = jobCategoryId;
      }
    }

    if (auth?.user?.clients?.id) {
      if (isSavedCandidates) {
        dispatch({
          type: CandidateActions.GET_SAVED_CANDIDATE,
          payload: {
            filterData: data,
            page,
            perPage,
            isSavedCandidates,
          },
        });
      } else {
        if (bestMatchesCandidate == true) {
          dispatch({
            type: CandidateActions.GET_BEST_MATCHES_CANDIDATE,
            payload: {
              filterData: data,
              page,
              perPage,
              isSavedCandidates,
            },
          });
        } else {
          dispatch({
            type: CandidateActions.GET_CLIENT_CANDIDATE,
            payload: {
              filterData: data,
              page,
              perPage,
              isSavedCandidates,
            },
          });
        }
      }
    } else {
      dispatch({
        type: CandidateActions.GET_CANDIDATE,
        payload: {
          filterData: data,
          page,
          perPage,
        },
      });
    }
  };

  useEffect(() => {
    getCandidates(currentPage);
  }, []);

  useEffect(() => {
    if (auth?.user?.clients?.id) {
      if (
        Object.keys(filterData).length &&
        create === false &&
        update === false &&
        show === false &&
        filterKey(filterData)?.length
      ) {
        getCandidates(currentPage);
      }
    } else {
      if (
        Object.keys(filterData).length &&
        create === false &&
        update === false &&
        show === false
      ) {
        getCandidates(currentPage);
      }
    }
    // if (filterJobCategory?.length > 0) {
    //   getCandidates(currentPage);
    // }
  }, [filterData]);

  useEffect(() => {
    if (!show) {
      setCandidate([]);
      setIndustriesData([]);
    }
  }, [show]);

  const clearStates = () => {
    if (candidates === "candidates_email_unique") {
      candidate.education = education;
      candidate.experience = experience;
      tostify("Email Already Exist");
    } else if (candidates === "candidates_mobile_unique") {
      candidate.education = education;
      candidate.experience = experience;
      tostify("Mobile Number Already Exist");
    } else {
      if (candidateId) {
        history.push(`/${slug}/candidate`);
      } else {
        setLoading(false);
        setEducation([]);
        setExperience([]);
        // setFilterData([]);
        setIndustriesData([]);
        setCreate(false);
        setUpdate(false);
        setIsDisabledAllFields(false);
        setCandidate([]);
        setShow(false);
        setAnimation({});
      }
    }
  };

  useEffect(() => {
    if (create === true) {
      clearStates();
    }
  }, [candidates]);

  // useEffect(() => {
  //   setTotalRows(candidates.total);
  // }, [candidates]);
  useEffect(() => {
    if (bestMatchesCandidates?.total && bestMatchesCandidate == true) {
      setTotalRows(bestMatchesCandidates.total);
    } else {
      setTotalRows(candidates.total);
    }
  }, [bestMatchesCandidates, candidates]);

  const interviewRequest = async (candidate) => {
    dispatch({
      type: clientactions.INTERVIEW_REQUEST,
      payload: {
        candidate: candidate?.id,
        client: auth?.user?.clients?.id,
        clientCandidateData: {
          filterData: filterData,
          page: 1,
          perPage,
        },
      },
    });
  };
  const deleteCandidate = (row) => {
    setLoading(true);
    dispatch({
      type: CandidateActions.DELETE_CANDIDATE,
      payload: { id: row.id },
      setLoading,
    });
  };
  const selectedCandidatesRef = useRef([]);

  const handleSelectedCard = (candidate, isChecked) => {
    if (isChecked) {
      selectedCandidatesRef.current = [
        ...selectedCandidatesRef.current,
        candidate,
      ];
    } else {
      selectedCandidatesRef.current = selectedCandidatesRef.current.filter(
        (item) => item !== candidate
      );
    }

    handleselected(selectedCandidatesRef.current);
  };
  const handleselected = (rows) => {
    let mails = [];
    new Promise(() => {
      setTimeout(() => {
        mails = rows?.map((ele) => {
          const obj = {};
          obj.label = `${ele?.firstname} ${ele?.lastname}`;
          obj.email = ele.email;
          return obj;
        }, 3000);
      });
    });
    new Promise(() => {
      setTimeout(() => {
        dispatch({
          type: CandidateActions.SET_SELECTED_FOR_EMAIL_CANDIDATE,
          payload: { mails, totalRows: rows?.length },
        });
        setPromiseLoading(false);
      }, 3000);
    });
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const statusUpdate = (row) => {
    dispatch({
      type: CandidateActions.CANDIDATE_STATUS,
      payload: { id: row.id },
    });
  };

  const decreaseResumeDownload = (userId, subscriptionId, row) => {
    dispatch({
      type: subscriptionActions.DECREASE_RESUME_DOWNLOADING,
      payload: {
        userId,
        subscriptionId,
        candidateId: row?.id,
        url: row?.resume,
      },
    });
  };
  const handleOpenResume = (row) => {
    if (isSavedCandidates || row?.saved_Candidates?.id) {
      window.open(row?.resume);
    } else {
      if (
        currentPlan?.price == null ||
        currentPlan?.planName == "free" ||
        currentPlan?.planFeature?.resume_download_count != -1
      ) {
        decreaseResumeDownload(auth?.user?.id, currentSubscription?.id, row);
      } else {
        decreaseResumeDownload(auth?.user?.id, currentSubscription?.id, row);
      }
    }
  };

  const columns = [
    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => {
        return (
          <div div className="column-action d-flex align-items-center">
            <span
              style={{ cursor: "pointer" }}
              onClick={async () => {
                if (
                  row?.agency?.email == user?.agency?.email ||
                  user?.agency?.email == allAccessEmail
                ) {
                  setCandidate(row);
                  setIndustriesData(row?.industries_relation);
                  statusUpdate(row);
                  setEmail(row?.email);
                  setUpdate(true);
                  setShow(true);
                } else {
                  setIsDisabledAllFields(true);
                  setCandidate(row);
                  setIndustriesData(row?.industries_relation);
                  statusUpdate(row);
                  setEmail(row?.email);
                  setUpdate(true);
                  setShow(true);
                }
              }}
            >
              <Edit size={17} className="mx-1" />
            </span>
            <span
              style={
                row?.agency?.email == user?.agency?.email ||
                user?.email == allAccessEmail
                  ? { cursor: "pointer" }
                  : { pointerEvents: "none", opacity: "0.6" }
              }
              onClick={() => {
                if (
                  row?.agency?.email == user?.agency?.email ||
                  user?.email == allAccessEmail
                ) {
                  handleDeleteClick(row);
                }
              }}
            >
              <Trash size={17} className="mx-1" />
            </span>
          </div>
        );
      },
    },
    {
      name: "Interview LineUp",
      selector: (row) => (
        <span
          onClick={() => {
            history.push(
              `/${slug}/interview?id=${row.id}&first=${row.firstname}&last=${row.lastname}`
            );
          }}
          style={{ cursor: "pointer" }}
        >
          <UserCheck size={17} className="mx-1" />
        </span>
      ),
    },
    {
      name: "Status",
      minWidth: "110px",
      cell: (row) => (
        <Badge
          Badge
          pill
          color="defult"
          className="column-action d-flex align-items-center"
          style={{
            textTransform: "capitalize",
            backgroundColor:
              row.status === "new" ? themecolor : `${themecolor}80`,
          }}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Interview Status",
      minWidth: "110px",
      cell: (row) => {
        let color = "light-success";
        if (row?.interviewStatus === "available") color = "light-warning";
        else if (row?.interviewStatus === "scheduled") color = "light-info";
        else if (row?.interviewStatus === "rejected") color = "light-danger";
        else if (row?.interviewStatus === "completed")
          color = "light-secondary";
        else if (row?.interviewStatus === "cv shared") color = "secondary";
        else if (row?.interviewStatus === "hired") color = "light-success";
        else if (row?.interviewStatus === "Not Joined It") color = "warning";
        else if (row?.interviewStatus === "Left") color = "light-info";
        else if (row?.interviewStatus === "shortlisted") color = "info";
        else if (row?.interviewStatus === "trail") color = "dark";
        else if (row?.interviewStatus === "reschedule") color = "warning";
        return (
          <Badge
            Badge
            pill
            color={color}
            className="column-action d-flex align-items-center"
            style={{ textTransform: "capitalize" }}
          >
            {row.interviewStatus}
          </Badge>
        );
      },
    },

    {
      name: "Interview Date",
      selector: (row) => (
        <>
          {row?.interviewStatus === "scheduled" ? row?.interviews?.date : null}
        </>
      ),
    },
    {
      name: "Scheduled By",
      selector: (row) => <>{row?.interviews?.users?.name}</>,
    },
    {
      name: "Create_AT",
      selector: (row) => row?.createdAt?.slice(0, 10),
    },
    {
      name: "First Name",
      selector: (row) => row?.firstname,
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastname,
    },
    {
      name: "Email-id",
      selector: (row) => row?.email,
    },
    {
      name: "Contact number",
      selector: (row) => row?.mobile,
    },
    {
      name: "gender",
      selector: (row) => row?.gender,
    },
    {
      name: "City",
      selector: (row) => row?.city,
    },
    {
      name: "Address",
      selector: (row) => row?.street,
    },
    {
      name: "Job Category",
      selector: (row) => row?.professional?.jobCategory?.jobCategory,
    },
    {
      name: "Experience",
      selector: (row) => row?.professional?.experienceInyear,
    },
    {
      name: "Qualification Held",
      selector: (row) => row?.professional?.highestQualification,
    },

    {
      name: "Currant Salary",
      selector: (row) => row?.professional?.currentSalary,
    },
    {
      name: "Expected Salary",
      selector: (row) => row?.professional?.expectedsalary,
    },
    {
      name: "Preferable Job Location",
      selector: (row) => row?.professional?.preferedJobLocation,
    },
    {
      name: "Notice Period",
      selector: (row) => row?.professional?.noticePeriod,
    },
    {
      name: "Currently Working",
      selector: (row) => row?.professional?.currentlyWorking,
    },
    {
      name: "resume",
      cell: (row) => {
        return row?.resume !== null && row?.resume?.length > 0 ? (
          <>
            <div
              style={{ color: "#7F8487", cursor: "pointer" }}
              onClick={() => window.open(row?.resume)}
            >
              <FileText />
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      name: "image",
      cell: (row) => {
        return row?.image?.length > 0 ? (
          <>
            <div
              style={{ color: "#7F8487", cursor: "pointer" }}
              onClick={() => window.open(row.image)}
            >
              <Image />
            </div>
          </>
        ) : (
          "null"
        );
      },
    },
    {
      name: "Whatsapp",
      cell: (row) => {
        return row?.mobile > 0 ? (
          <>
            <a
              onClick={() => window.open(`https://wa.me/91${row?.mobile}`)}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={whatsapp} style={{ height: "20%", width: "20%" }} />
            </a>
          </>
        ) : (
          "null"
        );
      },
    },
  ];

  const columnsClients = [
    {
      name: "Status",
      minWidth: "110px",
      cell: (row) => {
        const createdDate = moment(row.created_at);
        const fiveDaysAgo = moment().subtract(5, "days");

        // if (user?.email != 'gunjan@growworkinfotech.com') {
        //   return null
        // }

        if (createdDate.isAfter(fiveDaysAgo)) {
          return (
            <Badge
              pill
              color="default"
              style={{ backgroundColor: themecolor }}
              className="column-action d-flex align-items-center"
            >
              {"New"}
            </Badge>
          );
        } else {
          return null;
        }
      },
    },
    {
      name: "First Name",
      selector: (row) => row?.firstname,
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastname,
    },
    {
      name: "Job Category",
      selector: (row) => row?.professional?.jobCategory?.jobCategory,
    },
    {
      name: "gender",
      selector: (row) => row?.gender,
    },
    {
      name: "Qualification Held",
      selector: (row) => row?.professional?.highestQualification,
    },
    {
      name: "Experience",
      selector: (row) => row?.professional?.experienceInyear,
    },

    {
      name: "Currant Salary",
      selector: (row) => row?.professional?.currentSalary,
    },
    {
      name: "Expected Salary",
      selector: (row) => row?.professional?.expectedsalary,
    },
    {
      name: "Preferable Job Location",
      selector: (row) => row?.professional?.preferedJobLocation,
    },
    {
      name: "Notice Period",
      selector: (row) => row?.professional?.noticePeriod,
    },
    {
      name: "Currently Working",
      selector: (row) => row?.professional?.currentlyWorking,
    },
    {
      name: "City",
      selector: (row) => row?.city,
    },
    {
      name: "Chat",
      cell: (row) => {
        return (
          <>
            <a
              onClick={() => {
                setWhatsappOpen(true);
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={whatsapp} style={{ height: "20%", width: "20%" }} />
            </a>
          </>
        );
      },
    },
    {
      name: "Interview Shedule",
      cell: (row) => (
        <Button
          disabled={row?.interview_request?.isdisabled == true ? true : false}
          onClick={() => {
            setLoading(true);
            interviewRequest(row);
          }}
          style={
            row?.interview_request?.isdisabled == true
              ? {
                  opacity: "0.5",
                  padding: "10px",
                  backgroundColor: themecolor,
                  color: "white",
                }
              : { padding: "10px", backgroundColor: themecolor, color: "white" }
          }
          color="default"
        >
          {row?.interview_request?.isdisabled == true
            ? "Req. Sent"
            : "Interview"}
        </Button>
      ),
    },
    {
      name: "resume",
      cell: (row) => {
        // if (user?.email != 'gunjan@growworkinfotech.com') {
        //   return null
        // }

        return row?.resume !== "null" && row?.resume !== null ? (
          <>
            <div
              style={{ color: "#7F8487", cursor: "pointer" }}
              onClick={() => handleOpenResume(row)}
            >
              <FileText />
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
  ];

  const subscriptionColumnsClients = [
    {
      name: "Status",
      minWidth: "110px",
      cell: (row) => {
        const createdDate = moment(row.created_at);
        const fiveDaysAgo = moment().subtract(5, "days");

        if (createdDate.isAfter(fiveDaysAgo)) {
          return (
            <Badge
              pill
              color="default"
              style={{ backgroundColor: themecolor }}
              className="column-action d-flex align-items-center"
            >
              {"New"}
            </Badge>
          );
        } else {
          return null;
        }
      },
    },
    {
      name: "First Name",
      selector: (row) => row?.firstname,
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastname,
    },
    {
      name: "Email-id",
      selector: (row) => row?.email,
    },
    {
      name: "Contact number",
      selector: (row) => row?.mobile,
    },
    {
      name: "Job Category",
      selector: (row) => row?.professional?.jobCategory?.jobCategory,
    },
    {
      name: "gender",
      selector: (row) => row?.gender,
    },
    {
      name: "Qualification Held",
      selector: (row) => row?.professional?.highestQualification,
    },
    {
      name: "Experience",
      selector: (row) => row?.professional?.experienceInyear,
    },
    {
      name: "Currant Salary",
      selector: (row) => row?.professional?.currentSalary,
    },
    {
      name: "Expected Salary",
      selector: (row) => row?.professional?.expectedsalary,
    },
    {
      name: "Preferable Job Location",
      selector: (row) => row?.professional?.preferedJobLocation,
    },
    {
      name: "Notice Period",
      selector: (row) => row?.professional?.noticePeriod,
    },
    {
      name: "Currently Working",
      selector: (row) => row?.professional?.currentlyWorking,
    },
    {
      name: "City",
      selector: (row) => row?.city,
    },
    {
      name: "Chat",
      cell: (row) => {
        return (
          <>
            <a
              onClick={() => {
                setShowWPModal(true), setWPnumber(row?.mobile);
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={whatsapp} style={{ height: "20%", width: "20%" }} />
            </a>
          </>
        );
      },
    },
    // {
    //   auth.user.subscription.active_plan
    // }

    {
      name: "resume",
      cell: (row) => {
        return row?.resume !== "null" && row?.resume !== null ? (
          <>
            <div
              style={{ color: "#7F8487", cursor: "pointer" }}
              onClick={() => handleOpenResume(row)}
            >
              <FileText />
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
  ];

  const CandidateCreateHandler = async () => {
    setLoading(true);
    let education = [];
    if (candidate?.education) {
      education = candidate?.education?.filter((items) => {
        delete items.eng;
        return items;
      });
    }
    const experience = [];

    candidate?.experience?.map((ele) => {
      if (
        ele.occupation !== "" ||
        ele.summary !== "" ||
        ele.workduration !== "" ||
        ele.companyName !== "" ||
        ele.companyAddress !== "" ||
        ele.companyMobile !== "" ||
        ele.companyLink !== ""
      ) {
        experience.push(ele);
      }
    });
    setEducation(candidate?.education);
    setExperience(candidate?.experience);
    delete candidate.education;
    delete candidate.experience;

    // if (candidate?.image) {
    //   const resp = await uploadFiles(candidate?.image)
    //   candidate.image = `https:${resp.url}`
    // }
    // if (candidate?.resume) {
    //   const resp = await uploadFiles(candidate?.resume)
    //   candidate.resume = `https:${resp.url}`
    // }
    if (candidate?.image) {
      const resp = await awsUploadAssetsWithResp(candidate?.image);
      candidate.image = `${resp.url}`;
    }
    if (candidate?.resume) {
      const resp = await awsUploadAssetsWithResp(candidate?.resume);
      candidate.resume = `${resp.url}`;
    }
    const fm = new FormData();
    for (const key in candidate) {
      if (key === "professional") {
        fm.append("professional", JSON.stringify(candidate[key]));
      } else if (key === "industries_relation") {
        fm.append("industries_relation", JSON.stringify(candidate[key]));
      } else {
        fm.append(key, candidate[key]);
      }
    }

    if (education?.length > 0)
      fm.append("education", JSON.stringify(education));
    if (experience?.length > 0)
      fm.append("experience", JSON.stringify(experience));

    setLoading(true);
    await dispatch({
      type: CandidateActions.CREATE_CANDIDATE,
      payload: { data: fm, setLoading, page: currentPage, perPage: perPage },
    });
  };

  const CandidateUpdateHandler = async () => {
    setLoading(true);
    delete candidate.interviews;

    const data = candidates?.results?.filter(
      (item) => item?.id == candidate?.id
    );
    const ObjData = Object.assign({}, ...data);
    console.info("--------------------");
    console.info("ObjDataObjDataObjData => ", ObjData);
    console.info("--------------------");
    console.info("--------------------");
    console.info("ObjDataObjDataObjData => ", candidate);
    console.info("--------------------");
    const isMatch = _.isMatch(ObjData, candidate);

    if (isMatch == false) {
      const typeResume = typeof candidate?.resume;
      const typeImage = typeof candidate?.image;

      if (typeImage === "object" && candidate?.image !== null) {
        // const resp = await uploadFiles(candidate?.image)
        // candidate.image = `https:${resp.url}`
        const resp = await awsUploadAssetsWithResp(candidate?.image);
        candidate.image = `${resp.url}`;
      }

      if (typeResume === "object" && candidate?.resume !== null) {
        // const resp = await uploadFiles(candidate?.resume)/
        // candidate.resume = `https:${resp.url}`
        const resp = await awsUploadAssetsWithResp(candidate?.resume);
        candidate.resume = `${resp.url}`;
      }

      const fm = new FormData();
      for (const key in candidate) {
        if (key === "professional") {
          fm.append("professional", JSON.stringify(candidate[key]));
        } else if (key === "industries_relation") {
          fm.append("industries_relation", JSON.stringify(candidate[key]));
        } else if (key === "status") {
          fm.append(key, "view");
        } else {
          fm.append(key, candidate[key]);
        }
      }

      await dispatch({
        type: CandidateActions.UPDATE_CANDIDATE,
        payload: {
          id: candidate.id,
          data: fm,
          page: currentPage,
          perPage: perPage,
        },
      });
      setShow(false);
    } else {
      setLoading(false);
    }
  };

  const Validations = async () => {
    const error = false;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (candidate?.firstname?.length < 2 || candidate?.firstname === undefined)
      return tostify("Please Enter Valid First Name", error);
    else if (
      candidate?.lastname?.length < 2 ||
      candidate?.lastname === undefined
    )
      return tostify(" Please Enter Valid Last Name", error);
    else if (!email || regex.test(email) === false)
      return tostify("  Please Enter Valid Email", error);
    else if (
      candidate?.mobile?.length !== 10 ||
      candidate?.mobile === undefined
    )
      return tostify("Please Enter Valid Contact Number", error);
    else if (
      candidate?.alternateMobile?.length !== 10 ||
      candidate?.alternateMobile === undefined
    )
      return tostify("Please Enter Valid Alternative Number", error);
    else if (gender === null || candidate?.gender === undefined)
      return tostify("Please Select Gender", error);
    else if (
      candidate?.state == undefined ||
      candidate?.state?.length === 0 ||
      candidate?.state == "" ||
      candidate?.stateId == undefined ||
      candidate?.stateId?.length === 0 ||
      candidate?.stateId == ""
    )
      return tostify("Please Enter Valid State", error);
    else if (
      candidate?.city == undefined ||
      candidate?.city?.length === 0 ||
      candidate?.city == "" ||
      candidate?.cityId == undefined ||
      candidate?.cityId?.length === 0 ||
      candidate?.cityId == ""
    )
      return tostify("Please Enter Valid City", error);
    else if (
      candidate?.industries_relation?.length === 0 ||
      candidate?.industries_relation === undefined
    )
      return tostify(" Please Select Industries", error);
    else if (
      candidate?.professional?.highestQualification === undefined ||
      candidate?.professional?.highestQualification?.length === 0
    )
      return tostify("Please Enter Qualification", error);
    else if (
      candidate?.professional?.field === undefined ||
      candidate?.professional?.field?.length === 0
    )
      return tostify("Please Enter Education", error);
    else if (
      candidate?.professional?.designation === undefined ||
      candidate?.professional?.designation?.length === 0
    )
      return tostify("Please Enter Designation", error);
    else if (
      candidate?.professional?.jobCategoryId === undefined ||
      candidate?.professional?.jobCategoryId?.length === 0
    )
      return tostify("Please Enter Job Category", error);
    else if (
      candidate?.professional?.english === undefined ||
      candidate?.professional?.english?.length === 0
    )
      return tostify("Please Enter Speaking Level", error);
    else if (
      candidate?.professional?.preferedJobLocation === undefined ||
      candidate?.professional?.preferedJobLocation?.length === 0
    )
      return tostify("Please Enter Prefered Job Location", error);
    return error;
  };
  const CandidateActionHandler = async () => {
    if (isDisabledAllFields == false) {
      const err = await Validations();
      if (update && err === false) {
        CandidateUpdateHandler();
      }
      if (create && err === false) {
        CandidateCreateHandler();
      }
    }
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    getCandidates(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const data = filterData;
    if (auth?.user?.clients?.industries?.id) {
      data.industriesId = auth?.user?.clients?.industries?.id;
      // data.interviewStatus = "available"
    }
    // await dispatch({
    //   type: CandidateActions.GET_CANDIDATE,
    //   payload: {
    //     filterData: data,
    //     page,
    //     perPage: newPerPage,
    //     isSavedCandidates: isSavedCandidates,
    //   },
    // });
    if (auth?.user?.clients?.id) {
      if (isSavedCandidates) {
        dispatch({
          type: CandidateActions.GET_SAVED_CANDIDATE,
          payload: {
            filterData: data,
            page,
            perPage,
            isSavedCandidates,
          },
        });
      } else {
        if (bestMatchesCandidate == true) {
          dispatch({
            type: CandidateActions.GET_BEST_MATCHES_CANDIDATE,
            payload: {
              filterData: data,
              page,
              perPage,
              isSavedCandidates,
            },
          });
        } else {
          dispatch({
            type: CandidateActions.GET_CLIENT_CANDIDATE,
            payload: {
              filterData: data,
              page,
              perPage,
              isSavedCandidates,
            },
          });
        }
      }
    } else {
      await dispatch({
        type: CandidateActions.GET_CANDIDATE,
        payload: {
          filterData: data,
          page,
          perPage: newPerPage,
        },
      });
    }
    setPerPage(newPerPage);
  };

  const handleFilter = (filter) => {
    setFilterData(filter);
    if (width < 769) {
      filterToggle();
    }
  };

  const handleFilterToggleMode = (filter) => {
    setFilterToggleMode(filter);
  };
  const [clear, setclear] = useState(false);
  const handleClear = () => {
    setclear(true);
    // setFilterJobCategory([]);
  };
  const setclearstate = (clear) => {
    setclear(clear);
  };
  const customStyles = {
    headCells: {
      style: {
        justifyContent: "center",
        backgroundColor: `${themecolor}10`,
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
  };

  const filterToggle = () => {
    setFilterToggleMode(!filterToggleMode);
  };

  useEffect(() => {
    if (candidateId) {
      setShow(true);
      setUpdate(true);
      setIndustriesData(candidates?.industries_relation);
      setCandidate(candidates);
      setEmail(candidates?.email);
    }
  }, [candidateId]);

  useEffect(() => {
    setAnimation(false);
  }, [animation]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        setFilterToggleMode(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    const nextPage = 1;
    const perpage1 = perPage + 10;
    handlePerRowsChange(perpage1, nextPage);
  };
  const renderStates = (candidate) => {
    const statesArr = [
      {
        title: "Name",
        value: `${candidate?.firstname} ${candidate?.lastname}` || "-",
      },
      count?.plan?.planName !== "free"
        ? {
            title: "Email",
            value: candidate?.email || "-",
          }
        : null,
      count?.plan?.planName !== "free"
        ? {
            title: "Contact",
            value: candidate?.mobile || "-",
          }
        : null,
      {
        title: "City",
        value: candidate?.city || "-",
      },
      {
        title: "Job Category",
        value: candidate?.professional?.jobCategory?.jobCategory || "-",
      },
    ].filter(Boolean);

    return statesArr.map((state, index) => (
      <>
        <div
          key={state.title}
          className="browser-states"
          style={{ marginTop: "5px" }}
        >
          <div className="state-col">
            <strong
              style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}
            >
              {state.title}:{" "}
            </strong>
            <strong style={{ fontSize: "12px" }}>{state.value}</strong>
          </div>
        </div>
        {/* <div
          key={state.title}
          className="browser-states"
          style={{ marginTop: "5px" }}
        >
          <div className="d-flex">
            <h6
              className="align-self-center mb-0 "
              style={{ fontSize: "12px", color: "black", fontWeight: "bold" }}
            >
              {state.title}
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="fw-bold text-body-heading "
              style={{ fontSize: "12px" }}
            >
              {state.value}
            </div>
          </div>
        </div> */}
        {/* <hr
          className="invoice-spacing"
          style={{ margin: 0, height: "0.5px" }}
        /> */}
      </>
    ));
  };

  const renderStatesMore = (candidate) => {
    const statesArr = [
      {
        title: "Qualification Held",
        value: candidate?.professional?.highestQualification || "-",
      },
      {
        title: "Experience",
        value: candidate?.professional?.experienceInyear || "-",
      },
      {
        title: "Currant Salary",
        value: candidate?.professional?.currentSalary || "-",
      },
      {
        title: "Expected Salary",
        value: candidate?.professional?.expectedsalary || "-",
      },
      {
        title: "Currently Working",
        value: candidate?.professional?.currentlyWorking || "-",
      },
      {
        title: "Notice Period",
        value: candidate?.professional?.noticePeriod || "-",
      },
      {
        title: "Gender",
        value: candidate?.gender || "-",
      },
      {
        title: "Address",
        value: candidate?.street || "-",
      },
      {
        title: "Preferable Job Location",
        value: candidate?.professional?.preferedJobLocation || "-",
      },
    ];

    return statesArr.map((state, index) => (
      <>
        <div
          key={state.title}
          className="browser-states"
          style={{ marginTop: "5px" }}
        >
          <div className="state-col">
            <strong
              style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}
            >
              {state.title}:{" "}
            </strong>
            <strong style={{ fontSize: "12px" }}>{state.value}</strong>
          </div>
        </div>
        {/* <div
          key={state.title}
          className="browser-states"
          style={{ marginTop: "5px" }}
        >
          <div className="d-flex">
            <h6
              className="align-self-center mb-0 "
              style={{ fontSize: "12px", color: "black", fontWeight: "bold" }}
            >
              {state.title}
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="fw-bold text-body-heading "
              style={{ fontSize: "12px" }}
            >
              {state.value}
            </div>
          </div>
        </div> */}
      </>
    ));
  };

  const renderStatesTable = (candidate) => {
    const industryCategories =
      candidate?.industries_relation
        ?.map((relation) => relation.industries?.industryCategory)
        .filter(Boolean)
        .join(" | ") || "-";

    const statesArr = [
      {
        title: "Industries",
        value: industryCategories,
      },
      {
        title: "Job Category",
        value: candidate?.professional?.jobCategory?.jobCategory || "-",
      },
      {
        title: "Education",
        value:
          `${candidate?.professional?.field} [${candidate?.professional?.highestQualification}]` ||
          "-",
      },
      {
        title: "Pref. Location",
        value: candidate?.professional?.preferedJobLocation || "-",
      },
      {
        title: "Skills",
        value: candidate?.professional?.skill || "-",
      },
    ];

    return statesArr.map((state, index) => (
      <>
        <div
          key={state.title}
          className="browser-states"
          style={{ marginTop: "10px" }}
        >
          <div className="state-col">
            <Row>
              <Col md={3}>
                <strong
                  style={{
                    fontSize: "12px",
                    color: "gray",
                    fontWeight: "bold",
                  }}
                >
                  {state.title}:{" "}
                </strong>
              </Col>
              <Col md={9}>
                <strong style={{ fontSize: "12px" }}>{state.value}</strong>
              </Col>
            </Row>
          </div>
        </div>
      </>
    ));
  };

  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const handleDeleteClick = (result) => {
    setCandidateToDelete(result);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    deleteCandidate(candidateToDelete);
    setShowDeleteModal(false);
  };
  const totalPages = Math.ceil(candidates?.total / perPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);
  function filterKey(data) {
    const notIncludedKeys = [
      "industriesId",
      "userId",
      "dataMergePermission",
      "salaryRangeEnd",
    ];
    if (auth?.user?.clients) {
      notIncludedKeys.push("jobCategoryId");
    }
    return Object.keys(data).filter((key) => !notIncludedKeys.includes(key));
  }
  const [hoverIndex, setHoverIndex] = useState(0);
  const editStyle = {
    backgroundColor: hoverIndex == 1 && `${themecolor}30`,
    color: hoverIndex == 1 && themecolor,
  };

  const imageStyle = {
    backgroundColor: hoverIndex == 3 && `${themecolor}30`,
    color: hoverIndex == 3 && themecolor,
  };

  const [clientData, setClientData] = useState([]);

  const ProfileImage = ({ imageUrl, gender, email, mobile, candidate }) => {
    const defaultIcon = gender === "female" ? FemaleIcon : maleIcon;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src={defaultIcon}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}

        {auth?.user?.clients ? (
          count?.plan?.planName === "free" ||
          count?.plan?.planName === "Trial" ? (
            <>
              {" "}
              <Button
                color="light-primary"
                style={{
                  backgroundColor: `${themecolor}`,
                  color: "white",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                onClick={() => setShowContactDetails(true)}
              >
                Show Contact Details
              </Button>
            </>
          ) : (
            <>
              <div
                // key={state.title}
                className="browser-states"
                style={{ marginTop: "25px" }}
              >
                <div className="state-col">
                  <strong
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {email}
                  </strong>
                </div>
                <div
                  className="state-col"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  <strong
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {mobile}
                  </strong>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div
              // key={state.title}
              className="browser-states"
              style={{ marginTop: "25px" }}
            >
              <div className="state-col">
                <strong
                  style={{
                    fontSize: "12px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {email}
                </strong>
              </div>
              <div
                className="state-col"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                <strong
                  style={{
                    fontSize: "12px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {mobile}
                </strong>
              </div>
            </div>
          </>
        )}

        {candidate?.resume !== null && candidate?.resume?.length > 0 ? (
          <Button
            color="defult"
            style={{
              marginTop: "20px",
              backgroundColor: themecolor,
              color: "white",
            }}
            onClick={() => {
              auth?.user?.clients
                ? handleOpenResume(candidate)
                : window.open(candidate?.resume);
            }}
          >
            View Resume
          </Button>
        ) : (
          <>
            {" "}
            <Button
              color="light-primary"
              style={{
                backgroundColor: `${themecolor}80`,
                color: "white",
                marginTop: "20px",
              }}
            >
              View Resume
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="filterDataButton"
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Modal
          className="modal-dialog-centered"
          isOpen={whatsappOpen}
          toggle={() => setWhatsappOpen(!whatsappOpen)}
        >
          <ModalHeader
            toggle={() => setWhatsappOpen(!whatsappOpen)}
            style={{ textAlign: "center" }}
          >
            {" "}
            Attention !!
          </ModalHeader>
          <ModalBody>
            To access this feature kindly Contact Uniqueworld Management Team:
            +91 9974877260
          </ModalBody>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={isPlanExpireModalOpen}
          onClosed={() => setIsPlanExpireModalOpen(false)}
          on
        >
          <ModalHeader style={{ textAlign: "center" }}>
            {" "}
            Attention !!
          </ModalHeader>
          <ModalBody>Your plan has expire..</ModalBody>
          <ModalFooter>
            <Button
              color="default"
              style={{ backgroundColor: themecolor, color: "white" }}
              onClick={() => {
                setIsPlanExpireModalOpen(false);
                window.localStorage.clear();
                dispatch({
                  type: authActions.SIGN_OUT,
                });
              }}
            >
              Okay
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={resumeCountFinishError}
        >
          <ModalHeader
            toggle={() => {
              dispatch({
                type: subscriptionActions.RESUME_COUNT_FINISH,
                payload: false,
              });
            }}
          />
          <ModalBody>
            You Can't Download Resume More Than 5, Please Upgrade Your Plan!!
            <br />
            Contact :{` ${auth?.user?.agency?.phoneNumber}`}
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              onClick={() => {
                dispatch({
                  type: subscriptionActions.RESUME_COUNT_FINISH,
                  payload: false,
                });
              }}
            >
              Close
            </Button>
            <Button
              color="default"
              style={{ backgroundColor: themecolor, color: "white" }}
              onClick={() => {
                dispatch({
                  type: subscriptionActions.RESUME_COUNT_FINISH,
                  payload: false,
                });
                history.push(`/${slug}/pricing`);
              }}
            >
              Upgrade Plan
            </Button>
          </ModalFooter>
        </Modal>

        <Modal className="modal-dialog-centered" isOpen={showContactDetails}>
          <ModalHeader toggle={() => setShowContactDetails(false)} />
          <ModalBody>
            You Can't See Contact Details, Please Upgrade Your Plan!!
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={() => setShowContactDetails(false)}>
              Close
            </Button>
            <Button
              color="default"
              style={{ backgroundColor: themecolor, color: "white" }}
              onClick={() => {
                setShowContactDetails(false);
                history.push(`/${slug}/pricing`);
              }}
            >
              Upgrade Plan
            </Button>
          </ModalFooter>
        </Modal>
        {/* <Loader loading={promiseLoading || isLoading || loading} /> */}
        <ReactCanvasConfetti
          fire={animation}
          particleCount={500}
          angle={90}
          spread={360}
          startVelocity={100}
          decay={0.8}
          gravity={-0.1}
          origin={{ x: 0.5, y: 0.5 }}
          shapes={"circle"}
          scalar={1}
          zIndex={-1}
          disableForReducedMotion={false}
          resize={true}
          useWorker={true}
          height={window.innerHeight}
          width={window.innerWidth}
          style={canvasStyles}
        />
        <h3 style={{ color: themecolor }}>
          <b>
            {isSavedCandidates
              ? "Saved Candidates"
              : bestMatchesCandidate == true
              ? "Best Matches Candidates"
              : "Candidates"}{" "}
          </b>
        </h3>
        {/* <Marquee>
          <h1>hello</h1>
        </Marquee> */}
        {filterKey(filterData).length > 0 ? (
          <div
            style={{ marginLeft: "auto", display: "flex", alignItems: "end" }}
          >
            {width > 786 ? (
              <h3 style={{ fontSize: "16px", marginBottom: "9px" }}>
                No Of Filter Applied : {filterKey(filterData).length}
              </h3>
            ) : null}

            <Button
              className="add-new-user "
              color="link"
              style={{ color: themecolor }}
              onClick={handleClear}
            >
              {width > 786 ? "Clear" : "Clear Filter"}
            </Button>
            {/* <X size={17} className="mx-1" onClick={handleClear} /> */}
          </div>
        ) : null}
        <Button
          style={
            width > 769
              ? {
                  width: "145px",
                  marginLeft:
                    filterKey(filterData).length > 0 ? "10px" : "auto",
                  backgroundColor: themecolor,
                  color: "white",
                }
              : {
                  width: "60px",
                  marginLeft:
                    filterKey(filterData).length > 0 ? "10px" : "auto",
                  backgroundColor: themecolor,
                  color: "white",
                }
          }
          color="default"
          onClick={() => {
            // setFilterData([]);
            filterToggle();
          }}
        >
          {width > 769 ? "Filter Data" : <FilterIcon size={17} />}
        </Button>
        {auth?.user?.clients ? (
          <></>
        ) : (
          <Button
            style={
              width > 769
                ? {
                    display: "none",
                    backgroundColor: themecolor,
                    color: "white",
                  }
                : {
                    width: "60px",
                    marginLeft: "10px",
                    backgroundColor: themecolor,
                    color: "white",
                  }
            }
            className="add-new-user"
            color="default"
            onClick={() => {
              setCreate(true);
              setShow(true);
            }}
          >
            <UserPlus size={17} />
          </Button>
        )}
      </div>
      {/* {user?.role?.name != "Admin" && width > 769 && (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <img
            src={img}
            alt="Your Image Alt Text"
            style={{ maxWidth: "50px", marginRight: "10px" }}
          />
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
            }}
          >
            <li style={{ justifyContent: "center", display: "flex" }}>
              {" "}
              <p className="text-primary">Unlimited Resume Database Access </p>
            </li>
            <li>
              <p className="text-primary">
                Automate your hiring process with a matchmaking tool to the next
                level{" "}
                <a
                  href={`/${slug}/pricing`}
                  style={{ color: "red", textDecoration: "underline" }}
                >
                  Know More
                </a>
              </p>
            </li>
          </ul>
        </div>
      )} */}
      <div style={width > 768 ? { display: "none" } : {}}>
        {auth?.user?.clients ? (
          (clientUser?.clients?.id && count?.plan?.planName == "free") ||
          count?.plan?.planName == "Trial" ? (
            //  && user?.email == 'gunjan@growworkinfotech.com'
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                Free Resume Download Remain : {5 - count?.resume_download_count}
              </div>
              <Rating
                readonly
                initialRating={5 - count?.resume_download_count}
                emptySymbol={<Star size={20} fill="#babfc7" stroke="#babfc7" />}
                fullSymbol={
                  <Star size={20} fill={"#323D76"} stroke={"#323D76"} />
                }
              />
            </div>
          ) : null
        ) : (
          <CustomHeader
            filterData={filterData}
            setFilterData={setFilterData}
            setShow={setShow}
            setCreate={setCreate}
            store={candidates?.results}
          />
        )}
      </div>

      <Row
        className="mt-1"
        style={{ height: "100%", transition: "all 0.5s ease-in-out" }}
      >
        <Col
          sm={12}
          md={3}
          lg={3}
          xl={3}
          style={{
            transition: "all 0.5s ease-in-out",
            display: filterToggleMode ? "block" : "none",
          }}
        >
          <Filter
            filterJobCategory={filterJobCategory}
            isSavedCandidates={isSavedCandidates}
            handleFilterToggleMode={handleFilterToggleMode}
            clear={clear}
            setclear={setclearstate}
            open={filterToggleMode}
            toggleSidebar={filterToggle}
            setJobCategoryId={setJobCategoryId}
            setFilterJobCategory={setFilterJobCategory}
            setLoading={setLoading}
            filterData={filterData}
            setFilterToggleMode={setFilterToggleMode}
            setFilterData={setFilterData}
            handleFilter={handleFilter}
            filterKey={filterKey}
          />
        </Col>

        <Col
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={
            width <= 768
              ? {
                  paddingLeft: 0,
                  paddingRight: 0,
                  overflow: "auto",
                  maxHeight: "600px",
                }
              : { paddingLeft: 0, paddingRight: 0 }
          }
        >
          {" "}
          {width < 786 && loading == true ? (
            <ComponentSpinner
              isClientCandidate={true}
              theamcolour={themecolor}
            />
          ) : (
            <>
              {candidates?.results?.length > 0 ? (
                <>
                  {candidates?.results?.map((result, index) => {
                    let color = "light-success";
                    if (result?.interviewStatus === "available")
                      color = "light-warning";
                    else if (result?.interviewStatus === "scheduled")
                      color = "light-info";
                    else if (result?.interviewStatus === "rejected")
                      color = "light-danger";
                    else if (result?.interviewStatus === "completed")
                      color = "light-secondary";
                    else if (result?.interviewStatus === "cv shared")
                      color = "secondary";
                    else if (result?.interviewStatus === "hired")
                      color = "light-success";
                    else if (result?.interviewStatus === "Not Joined It")
                      color = "warning";
                    else if (result?.interviewStatus === "Left")
                      color = "light-info";
                    else if (result?.interviewStatus === "shortlisted")
                      color = "info";
                    else if (result?.interviewStatus === "trail")
                      color = "dark";
                    else if (result?.interviewStatus === "reschedule")
                      color = "warning";

                    return (
                      <>
                        {/* <Loader loading={loading} /> */}

                        <Card
                          key={index}
                          className={`card-browser-states`}
                          style={
                            width > 769
                              ? { display: "none" }
                              : filterToggleMode
                              ? { display: "none" }
                              : {
                                  borderRadius: "5px",
                                  padding: "10px",
                                  marginBottom: "1rem",
                                }
                          }
                        >
                          <CardHeader
                            style={{ padding: "0px", justifyContent: "left" }}
                          >
                            <div className="d-flex gap-1 flex-column">
                              <CardTitle
                                tag="h4"
                                className="d-flex gap-1 align-items-center"
                              >
                                <Badge
                                  pill
                                  color="defult"
                                  style={{
                                    fontSize: "12px",
                                    backgroundColor:
                                      result.status === "new"
                                        ? themecolor
                                        : `${themecolor}80`,
                                  }}
                                  className="column-action d-flex align-items-center"
                                >
                                  {result.status}
                                </Badge>
                                {auth?.user?.clients ? null : (
                                  <Badge
                                    Badge
                                    style={{
                                      fontSize: "12px",
                                    }}
                                    pill
                                    color={color}
                                    className="column-action d-flex align-items-center"
                                  >
                                    {result.interviewStatus}
                                  </Badge>
                                )}
                              </CardTitle>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: "auto",
                              }}
                            >
                              {auth?.user?.clients ? (
                                result?.interview_request?.isdisabled == true ||
                                count?.plan?.planName === "free" ||
                                count?.plan?.planName === "Trial" ? null : (
                                  <div
                                    style={{
                                      color: "#7F8487",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      setLoading(true);
                                      interviewRequest(result);
                                    }}
                                  >
                                    <Calendar className="mx-1" size={17} />
                                  </div>
                                )
                              ) : (
                                <div
                                  onClick={() => {
                                    history.push(
                                      `/${slug}/interview?id=${result.id}&first=${result.firstname}&last=${result.lastname}`
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <UserCheck size={17} className="mx-1" />
                                </div>
                              )}

                              {result?.resume !== null &&
                                result?.resume?.length > 0 && (
                                  <div
                                    style={{
                                      color: "#7F8487",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      auth?.user?.clients
                                        ? handleOpenResume(result)
                                        : window.open(result?.resume);
                                    }}
                                    // onClick={() => window.open(result?.resume)}
                                  >
                                    <FileText className="mx-1" size={17} />
                                  </div>
                                )}
                              {result?.mobile && (
                                <a
                                  onClick={() => {
                                    setWPnumber(result?.mobile);
                                    auth?.user?.clients
                                      ? count?.plan?.planName !== "free" &&
                                        count?.plan?.planName !== "Trial"
                                        ? setShowWPModal(true)
                                        : setWhatsappOpen(true)
                                      : window.open(
                                          `https://wa.me/91${result?.mobile}`
                                        );
                                  }}
                                >
                                  <img
                                    className="mx-1"
                                    src={whatsapp}
                                    style={{ height: "17px", width: "17px" }}
                                  />
                                </a>
                              )}
                            </div>
                            {auth?.user?.clients ? null : (
                              <UncontrolledDropdown className="chart-dropdown">
                                <DropdownToggle
                                  color=""
                                  className="bg-transparent btn-sm border-0 p-50"
                                >
                                  <MoreVertical
                                    size={18}
                                    className="cursor-pointer"
                                  />
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <DropdownItem
                                    style={editStyle}
                                    onMouseEnter={() => setHoverIndex(1)}
                                    onMouseLeave={() => setHoverIndex(0)}
                                    className="w-100"
                                    onClick={async () => {
                                      if (
                                        result?.agency?.email ==
                                          user?.agency?.email ||
                                        user?.email == allAccessEmail
                                      ) {
                                        setCandidate(result);
                                        setIndustriesData(
                                          result?.industries_relation
                                        );
                                        statusUpdate(result);
                                        setEmail(result?.email);
                                        setUpdate(true);
                                        setShow(true);
                                      } else {
                                        setIsDisabledAllFields(true);
                                        setCandidate(result);
                                        setIndustriesData(
                                          result?.industries_relation
                                        );
                                        statusUpdate(result);
                                        setEmail(result?.email);
                                        setUpdate(true);
                                        setShow(true);
                                      }
                                    }}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    className="w-100"
                                    // style={deleteStyleStyle}
                                    onMouseEnter={() => setHoverIndex(2)}
                                    onMouseLeave={() => setHoverIndex(0)}
                                    style={
                                      result?.agency?.email ==
                                        user?.agency?.email ||
                                      user?.email == allAccessEmail
                                        ? {
                                            cursor: "pointer",
                                            backgroundColor:
                                              hoverIndex == 2 &&
                                              `${themecolor}30`,
                                            color:
                                              hoverIndex == 2 && themecolor,
                                          }
                                        : {
                                            pointerEvents: "none",
                                            opacity: "0.6",
                                            backgroundColor:
                                              hoverIndex == 2 &&
                                              `${themecolor}30`,
                                            color:
                                              hoverIndex == 2 && themecolor,
                                          }
                                    }
                                    onClick={() => {
                                      if (
                                        result?.agency?.email ==
                                          user?.agency?.email ||
                                        user?.email == allAccessEmail
                                      ) {
                                        handleDeleteClick(result);
                                      }
                                    }}
                                  >
                                    Delete
                                  </DropdownItem>
                                  {result?.image?.length > 0 && (
                                    <DropdownItem
                                      style={imageStyle}
                                      onMouseEnter={() => setHoverIndex(3)}
                                      onMouseLeave={() => setHoverIndex(0)}
                                      className="w-100"
                                      onClick={() => window.open(result?.image)}
                                    >
                                      Image
                                    </DropdownItem>
                                  )}
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            )}
                          </CardHeader>
                          <CardBody
                            style={{
                              padding: "0.5rem 0.5rem",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {renderStates(result)}{" "}
                            <div>
                              <Collapse isOpen={isOpen[index]}>
                                {renderStatesMore(result)}{" "}
                              </Collapse>
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ marginTop: "10px" }}
                              >
                                {isOpen[index] ? (
                                  <>
                                    <div
                                      className="view-collapse"
                                      onClick={() => toggle(index)}
                                      style={{
                                        color: themecolor,
                                        cursor: "pointer",
                                      }}
                                    >
                                      View Less
                                      <ChevronUp size={17} />{" "}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="view-collapse"
                                      onClick={() => toggle(index)}
                                      style={{
                                        color: themecolor,
                                        cursor: "pointer",
                                      }}
                                    >
                                      View More
                                      <ChevronDown size={17} />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </>
                    );
                  })}
                </>
              ) : (
                <Card
                  className={`card-browser-states`}
                  style={
                    width > 769
                      ? { display: "none" }
                      : filterToggleMode
                      ? { display: "none" }
                      : {
                          borderRadius: "5px",
                          padding: "10px",
                          marginBottom: "1rem",
                        }
                  }
                >
                  <CardHeader
                    style={{ padding: "0px", justifyContent: "center" }}
                  >
                    <div className="d-flex gap-1 flex-column">
                      <CardTitle
                        tag="h4"
                        className="d-flex gap-1 align-items-center"
                      >
                        There are no records to display
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              )}
            </>
          )}
          {width <= 768 &&
            !filterToggleMode &&
            candidates?.results?.length > 0 && (
              <Pagination className="d-flex mt-3 align-items-center justify-content-center">
                <PaginationItem>
                  <PaginationLink
                    previous
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                  >
                    <ChevronLeft size={15} /> Prev
                  </PaginationLink>
                </PaginationItem>

                {visiblePageNumbers?.map((pageNumber) => (
                  <PaginationItem
                    key={pageNumber}
                    active={pageNumber === currentPage}
                  >
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        borderRadius: "0.5rem ",
                        backgroundColor:
                          pageNumber === currentPage && themecolor,
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationLink
                    next
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                  >
                    Next <ChevronRight size={15} />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            )}
          {/* <Card
            className="overflow-hidden"
            style={width < 769 ? { display: "none" } : {}}
          > */}
          <div
            className="react-dataTable"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "74%" }}>
              {auth?.user?.clients ? (
                (clientUser?.clients?.id && count?.plan?.planName == "free") ||
                count?.plan?.planName == "Trial" ? (
                  //  && user?.email == 'gunjan@growworkinfotech.com'
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      Free Resume Download Remain :{" "}
                      {5 - count?.resume_download_count}
                    </div>
                    <Rating
                      readonly
                      initialRating={5 - count?.resume_download_count}
                      emptySymbol={
                        <Star size={20} fill="#babfc7" stroke="#babfc7" />
                      }
                      fullSymbol={
                        <Star size={20} fill={"#323D76"} stroke={"#323D76"} />
                      }
                    />
                  </div>
                ) : null
              ) : (
                <CustomHeader
                  filterData={filterData}
                  setFilterData={setFilterData}
                  setShow={setShow}
                  setCreate={setCreate}
                  store={candidates?.results}
                />
              )}
            </div>
            {/* <DataTable
                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
                // paginationComponentOptions={paginationComponentOptions}
                selectableRows={auth?.user?.role?.name === "Admin" && true}
                // selectableRowsNoSelectAll={true}
                selectableRowsHighlight
                // clearSelectedRows={isSent || isNotSent}
                onSelectedRowsChange={(e) => {
                  handleselected(e);
                  // setTimeout(() => {
                  setPromiseLoading(true);
                  // }, 10);
                }}
                fixedHeader={true}
                progressPending={loading || getSavedCandidateLoader}
                progressComponent={
                  <ComponentSpinner
                    isClientCandidate={true}
                    theamcolour={themecolor}
                  />
                }
                fixedHeaderScrollHeight="500px"
                noHeader
                subHeader
                sortServer
                pagination
                responsive
                // progressPending={getClientCandidateLoader}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={totalRows}
                paginationServer
                allowRowEvents
                customStyles={customStyles}
                highlightOnHover={true}
                columns={
                  auth?.user?.clients
                    ? count?.plan?.planName == "free" ||
                      count?.plan?.planName == "Trial"
                      ? columnsClients
                      : subscriptionColumnsClients
                    : columns
                }
                className="react-dataTable"
                data={candidateList}
                subHeaderComponent={
                  auth?.user?.clients ? (
                    (clientUser?.clients?.id &&
                      count?.plan?.planName == "free") ||
                    count?.plan?.planName == "Trial" ? (
                      //  && user?.email == 'gunjan@growworkinfotech.com'
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <div>
                          Free Resume Download Remain :{" "}
                          {5 - count?.resume_download_count}
                        </div>
                        <Rating
                          readonly
                          initialRating={5 - count?.resume_download_count}
                          emptySymbol={
                            <Star size={20} fill="#babfc7" stroke="#babfc7" />
                          }
                          fullSymbol={
                            <Star
                              size={20}
                              fill={"#323D76"}
                              stroke={"#323D76"}
                            />
                          }
                        />
                      </div>
                    ) : null
                  ) : (
                    <CustomHeader
                      filterData={filterData}
                      setFilterData={setFilterData}
                      setShow={setShow}
                      setCreate={setCreate}
                      store={candidates?.results}
                      loading={loading}
                      isCandidate={true}
                    />
                  )
                }
              /> */}
            {loading == true ? (
              <ComponentSpinner
                isClientCandidate={true}
                theamcolour={themecolor}
              />
            ) : (
              <>
                {candidateList?.map((candidate, index) => {
                  console.log("---------------------");
                  console.log("candidate =>", candidate);
                  console.log("---------------------");
                  let color = "light-success";
                  if (candidate?.interviewStatus === "available")
                    color = "light-warning";
                  else if (candidate?.interviewStatus === "scheduled")
                    color = "light-info";
                  else if (candidate?.interviewStatus === "rejected")
                    color = "light-danger";
                  else if (candidate?.interviewStatus === "completed")
                    color = "light-secondary";
                  else if (candidate?.interviewStatus === "cv shared")
                    color = "secondary";
                  else if (candidate?.interviewStatus === "hired")
                    color = "light-success";
                  else if (candidate?.interviewStatus === "Not Joined It")
                    color = "warning";
                  else if (candidate?.interviewStatus === "Left")
                    color = "light-info";
                  else if (candidate?.interviewStatus === "shortlisted")
                    color = "info";
                  else if (candidate?.interviewStatus === "trail")
                    color = "dark";
                  else if (candidate?.interviewStatus === "reschedule")
                    color = "warning";
                  return (
                    <>
                      <Card
                        key={index}
                        style={{ width: "90%", marginBottom: "10px" }}
                      >
                        <CardBody>
                          <Row>
                            <Col
                              md="7"
                              style={{
                                borderRight: "1px solid #ccc",
                                paddingRight: "15px",
                              }}
                            >
                              <Row>
                                <Col>
                                  <CardTitle
                                    tag="h4"
                                    className="d-flex align-items-center"
                                    style={{
                                      fontSize: "23px",
                                      borderBottom: "1px solid #ccc",
                                      paddingBottom: "15px",
                                    }}
                                  >
                                    {" "}
                                    <input
                                      type="checkbox"
                                      style={{ marginRight: "10px" }}
                                      onChange={(e) => {
                                        setTimeout(() => {
                                          setPromiseLoading(true);
                                        }, 10);
                                        handleSelectedCard(
                                          candidate,
                                          e.target.checked
                                        );
                                      }}
                                    />
                                    <span style={{
                                      fontSize:"18px"
                                    }}>
                                      {candidate?.firstname}{" "}
                                      {candidate?.lastname}
                                    </span>
                                    <Badge
                                      pill
                                      color="default"
                                      style={{
                                        fontSize: "10px",
                                        backgroundColor:
                                          candidate.status === "new"
                                            ? themecolor
                                            : `${themecolor}80`,
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {candidate?.status}
                                    </Badge>
                                    {auth?.user?.clients ? null : (
                                      <Badge
                                        style={{
                                          fontSize: "10px",
                                          marginLeft: "10px",
                                        }}
                                        pill
                                        color={color}
                                        className="column-action d-flex align-items-center"
                                      >
                                        {candidate?.interviewStatus}
                                      </Badge>
                                    )}
                                  </CardTitle>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="d-flex align-items-center">
                                  <Briefcase
                                    size={20}
                                    style={{
                                      marginRight: "5px",
                                      color: "gray",
                                    }}
                                  />
                                  <span style={{
                                      fontSize: "12px",
                                  }}>
                                    {candidate?.professional
                                      ?.experienceInyear || "-"}
                                  </span>
                                </Col>
                                <Col className="d-flex align-items-center">
                                  <span
                                    style={{
                                      marginRight: "5px",
                                      fontSize: "12px",
                                      color: "gray",
                                    }}
                                  >
                                    ₹
                                  </span>
                                  <span style={{
                                      fontSize: "12px",
                                  }}>
                                    {candidate?.professional?.expectedsalary ||
                                      "-"}
                                  </span>
                                </Col>
                                <Col className="d-flex align-items-center">
                                  <MapPin
                                    size={20}
                                    style={{
                                      marginRight: "5px",
                                      color: "gray",
                                    }}
                                  />
                                  <span style={{
                                      fontSize: "12px",
                                  }}>
                                    {candidate?.professional
                                      ?.preferedJobLocation || "-"}
                                  </span>
                                </Col>
                                <Col className="d-flex align-items-center">
                                  <Clock
                                    size={20}
                                    style={{
                                      marginRight: "5px",
                                      color: "gray",
                                    }}
                                  />
                                  <span style={{
                                      fontSize: "12px",
                                  }}>
                                    {candidate?.professional?.noticePeriod ||
                                      "-"}
                                  </span>
                                </Col>
                              </Row>
                              <Row>
                                <CardBody
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingLeft: "1rem",
                                    fontSize: "12px",
                                  }}
                                >
                                  {renderStatesTable(candidate)}{" "}
                                </CardBody>
                              </Row>
                            </Col>
                            <Col
                              md="4"
                              style={{
                                borderRight: "1px solid #ccc",
                                paddingRight: "15px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <ProfileImage
                                candidate={candidate}
                                imageUrl={candidate?.image}
                                gender={candidate?.gender}
                                email={candidate?.email}
                                mobile={candidate?.mobile}
                              />
                            </Col>
                            <Col
                              md="1"
                              className="d-flex align-items-center justify-content-center"
                              style={{ flexDirection: "column" }}
                            >
                              {auth?.user?.clients ? null : (
                                <>
                                  {" "}
                                  <div
                                    style={{
                                      color: "#007bff",
                                      cursor: "pointer",
                                      borderRadius: "50%",
                                      backgroundColor: "white",
                                      padding: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "40px",
                                      height: "40px",
                                      marginTop: "10px",
                                    }}
                                    onClick={async () => {
                                      if (
                                        candidate?.agency?.email ==
                                          user?.agency?.email ||
                                        user?.email == allAccessEmail
                                      ) {
                                        setCandidate(candidate);
                                        setIndustriesData(
                                          candidate?.industries_relation
                                        );
                                        statusUpdate(candidate);
                                        setEmail(candidate?.email);
                                        setUpdate(true);
                                        setShow(true);
                                      } else {
                                        setIsDisabledAllFields(true);
                                        setCandidate(candidate);
                                        setIndustriesData(
                                          candidate?.industries_relation
                                        );
                                        statusUpdate(candidate);
                                        setEmail(candidate?.email);
                                        setUpdate(true);
                                        setShow(true);
                                      }
                                    }}
                                  >
                                    <Edit size={25} color="black" />
                                  </div>
                                  <div
                                    style={{
                                      color: "#dc3545",
                                      cursor: "pointer",
                                      borderRadius: "50%",
                                      backgroundColor: "white",
                                      padding: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "40px",
                                      height: "40px",
                                      marginTop: "10px",
                                    }}
                                    onClick={() => {
                                      if (
                                        candidate?.agency?.email ==
                                          user?.agency?.email ||
                                        user?.email == allAccessEmail
                                      ) {
                                        handleDeleteClick(candidate);
                                      }
                                    }}
                                  >
                                    <Trash2 size={25} color="black" />
                                  </div>
                                </>
                              )}
                              {auth?.user?.clients ? null : (
                                <>
                                  <div
                                    onClick={() => {
                                      history.push(
                                        `/${slug}/interview?id=${candidate.id}&first=${candidate.firstname}&last=${candidate.lastname}`
                                      );
                                    }}
                                    style={{
                                      cursor: "pointer",
                                      borderRadius: "50%",
                                      backgroundColor: "white",
                                      padding: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "40px",
                                      height: "40px",
                                    }}
                                  >
                                    <UserCheck size={25} color="black" />
                                  </div>
                                </>
                              )}
                              {/* {auth?.user?.clients ? (
                                candidate?.interview_request?.isdisabled ==
                                true ? (
                                  <>
                                    {" "}
                                    <div
                                      style={{
                                        color: "#7F8487",
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        backgroundColor: "white",
                                        padding: "10px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "40px",
                                        height: "40px",
                                      }}
                                    >
                                      <Calendar size={25} color="gray" />
                                    </div>
                                  </>
                                ) : (
                                  <div
                                    style={{
                                      color: "#7F8487",
                                      cursor: "pointer",
                                      borderRadius: "50%",
                                      backgroundColor: "white",
                                      padding: "10px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "40px",
                                      height: "40px",
                                    }}
                                    onClick={() => {
                                      setLoading(true);
                                      interviewRequest(candidate);
                                    }}
                                  >
                                    <Calendar size={25} color="black" />
                                  </div>
                                )
                              ) : null} */}

                              {auth?.user?.clients ? (
                                count?.plan?.planName == "free" ||
                                count?.plan?.planName == "Trial" ? (
                                  candidate?.interview_request?.isdisabled ==
                                  true ? (
                                    <>
                                      {" "}
                                      <div
                                        style={{
                                          color: "#7F8487",
                                          cursor: "pointer",
                                          borderRadius: "50%",
                                          backgroundColor: "white",
                                          padding: "10px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      >
                                        <Calendar size={25} color="gray" />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <div
                                        style={{
                                          color: "#7F8487",
                                          cursor: "pointer",
                                          borderRadius: "50%",
                                          backgroundColor: "white",
                                          padding: "10px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "40px",
                                          height: "40px",
                                        }}
                                        onClick={() => {
                                          setLoading(true);
                                          interviewRequest(candidate);
                                        }}
                                      >
                                        <Calendar size={25} color="black" />
                                      </div>
                                    </>
                                  )
                                ) : null
                              ) : null}

                              {candidate?.mobile && (
                                <a
                                  onClick={() => {
                                    setWPnumber(candidate?.mobile);
                                    auth?.user?.clients
                                      ? count?.plan?.planName !== "free" &&
                                        count?.plan?.planName !== "Trial"
                                        ? setShowWPModal(true)
                                        : setWhatsappOpen(true)
                                      : window.open(
                                          `https://wa.me/91${candidate?.mobile}`
                                        );
                                  }}
                                  style={{
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    padding: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <img
                                    src={whatsapp}
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      color: "white",
                                    }}
                                  />
                                </a>
                              )}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          width: "75%",
                          marginBottom: "2rem",
                        }}
                      >
                        <div>
                          <span style={{ color: "gray",fontSize:"12px" }}>
                            Applied On&nbsp;: &nbsp;&nbsp;
                          </span>
                          <span style={{
                            fontSize:"12px"
                          }}>
                            {candidate?.createdAt
                              ? moment(candidate?.createdAt).format(
                                  "D MMM YYYY"
                                )
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}

            {!filterToggleMode && candidates?.results?.length > 0 && (
              <Pagination className="d-flex mt-3 align-items-center justify-content-center">
                <PaginationItem>
                  <PaginationLink
                    previous
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                  >
                    <ChevronLeft size={15} /> Prev
                  </PaginationLink>
                </PaginationItem>

                {visiblePageNumbers?.map((pageNumber) => (
                  <PaginationItem
                    key={pageNumber}
                    active={pageNumber === currentPage}
                  >
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        borderRadius: "0.5rem ",
                        backgroundColor:
                          pageNumber === currentPage && themecolor,
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationLink
                    next
                    href="#"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                  >
                    Next <ChevronRight size={15} />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            )}
          </div>
          {/* </Card> */}
        </Col>
      </Row>
      {show === true ? (
        <>
          <Candidate
            loading={loading}
            industriesData={industriesData}
            setIndustriesData={setIndustriesData}
            candidateId={candidateId}
            show={show}
            setGender={setGender}
            gender={gender}
            setFilterData={setFilterData}
            setShow={setShow}
            setCandidate={setCandidate}
            candidate={candidate}
            update={update}
            setUpdate={setUpdate}
            create={create}
            setCreate={setCreate}
            setEmail={setEmail}
            CandidateHandler={CandidateActionHandler}
            isDisabledAllFields={isDisabledAllFields}
            setIsDisabledAllFields={setIsDisabledAllFields}
          />
        </>
      ) : null}
      {showWPModal === true ? (
        <WhatsappDialog
          WPnumber={WPnumber}
          loading={loading}
          showWPModal={showWPModal}
          setShowWPModal={setShowWPModal}
          clientData={clientData}
          setClientData={setClientData}
        />
      ) : null}
      <Modal
        className="modal-dialog-centered"
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(!showDeleteModal)}
      >
        <ModalHeader toggle={() => setShowDeleteModal(!showDeleteModal)}>
          Confirm
        </ModalHeader>
        <ModalBody>Are you sure to delete this candidate?</ModalBody>
        <ModalFooter>
          <Button
            color="default"
            onClick={confirmDelete}
            style={{ backgroundColor: themecolor, color: "white" }}
          >
            Yes, Delete
          </Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={popUp} className="modal-dialog-centered">
        <ModalHeader
          toggle={() => {
            dispatch({
              type: actions.INTERVIEW_REQUEST_POPUP,
              payload: false,
            });
            setPopUp(false);
          }}
          className="bg-transparent"
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1" style={{ color: themecolor }}>
            Interview request sent!!
          </h1>
          <p className="text-center">
            {" "}
            Hey, we receive your request for Interview schedule. Our recruiter
            will call you soon.
          </p>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SecondPage;
