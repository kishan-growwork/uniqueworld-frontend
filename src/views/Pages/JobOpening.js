import DataTable from "react-data-table-component";
import {
  Edit,
  Delete,
  Trash,
  Trash2,
  Share,
  FileText,
  Filter as FilterIcon,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import { FaSyncAlt } from "react-icons/fa";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Tooltip,
  UncontrolledDropdown,
} from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/Header/CustomHeader";
import Filter from "../../components/Forms/JobOpening/filter";
import { tostify } from "../../components/Tostify";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";
// import { tostify } from '../../components/Tostify'

import ReactCanvasConfetti from "react-canvas-confetti";
import jobcategoryActions from "./../../redux/jobCategory/actions";
import industriesActions from "./../../redux/industries/actions";
import JobOpeningDialog from "../../components/Dialog/JobOpeningDialog";
import actions from "../../redux/jobOpening/actions";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Loader from "./../../components/Dialog/Loader";
import userActions from "../../redux/user/actions";
import useBreakpoint from "../../utility/hooks/useBreakpoints";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const JobOpening = () => {
  const { width } = useBreakpoint();
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const JobOpenings = useSelector((state) => state.jobOpening);
  const loginUser = useSelector((state) => state.auth.user);
  const [animation, setAnimation] = useState(false);
  const [jobOpening, setJobOpening] = useState([]);
  const [create, setCreate] = useState(false);
  const [copy, setCopy] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restart, setrestart] = useState(false);
  const [totalRows, setTotalRows] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openingId, setopeningid] = useState("");
  const [jobOpeningList, setjobOpeningList] = useState();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(
    JobOpenings?.results?.map(() => false) ?? []
  );
  const toggle = (index) => {
    const newCollapseStates = [...isOpen];
    newCollapseStates[index] = !newCollapseStates[index];
    setIsOpen(newCollapseStates);
  };
  const slug = localStorage.getItem("slug");
  useEffect(() => {
    if (user?.clients?.id) {
      dispatch({
        type: userActions.GET_LOGIN_USER_DETAIL,
        payload: user?.id,
      });
    }
  }, []);

  const clearStates = () => {
    setJobOpening([]);
    setShow(false);
    setLoading(false);
    setUpdate(false);
    setAnimation({});
    setCreate(false);
  };
  useEffect(() => {
    if (JobOpenings?.results?.length >= 0) {
      setjobOpeningList(JobOpenings?.results);
      setLoading(false);
    }

    if (JobOpenings?.isSuccess === true) {
      clearStates();
    }
  }, [JobOpenings?.results]);

  useEffect(() => {
    if (copy) {
      toast.success("Link Copied");
    } else {
      setCopy(false);
    }
  }, [copy]);

  const getjobOpening = async (page) => {
    setLoading(true);
    await dispatch({
      type: actions.GET_JOBOPENING,
      payload: {
        page,
        perPage,
        userId: loginUser?.id,
      },
    });
  };

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

  console.info("----------------------------");
  console.info("create =>", create);
  console.info("----------------------------");

  useEffect(() => {
    console.log("hereeeeeeeeeee");
    getjobOpening(currentPage);
  }, []);

  useEffect(() => {
    if (!show) setJobOpening([]);
  }, [show]);

  useEffect(() => {
    setTotalRows(JobOpenings.total);
  }, [JobOpenings]);
  const RestartjobOpening = async (id) => {
    setrestart(false);
    await dispatch({
      type: actions.RESTART_JOBOPENING,
      payload: { id: id },
    });
  };

  const deletejobOpening = async (row) => {
    setLoading(true);
    await dispatch({
      type: actions.DELETE_JOBOPENING,
      payload: { id: row.id, page: currentPage, perPage: perPage },
    });
  };

  const handleBestMatches = (row) => {
    if (row?.id) {
      history.push(`/${slug}/jobopening-match/${row?.id}`);
    }
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const columns = [
    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => (
        <div div className="column-action d-flex align-items-center">
          {row.fullname}
          {row.status != "Inactive" ? (
            <>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // row?.status != "Inactive" ?{}:{

                  setJobOpening(row);
                  setUpdate(true);
                  setShow(true);
                  // }
                }}
              >
                <Edit size={17} className="mx-1" />
              </span>
              <span
                style={
                  row?.status == "Inactive"
                    ? { opacity: 0.5 }
                    : { cursor: "pointer" }
                }
                onClick={() =>
                  row?.status != "Inactive" && handleDeleteClick(row)
                }
              >
                <Trash size={17} className="mx-1" />
              </span>
            </>
          ) : (
            <>
              <span
                id="syncTooltip"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // row?.status != "Inactive" ?{}:{
                  setopeningid(row?.id);
                  setrestart(true);
                  setJobOpening(row);
                  setUpdate(true);
                  setShow(true);
                  // }
                }}
              >
                <Tooltip
                  placement="top"
                  isOpen={tooltipOpen}
                  target="syncTooltip"
                  toggle={() => setTooltipOpen(!tooltipOpen)}
                >
                  Refresh
                </Tooltip>

                <FaSyncAlt size={17} className="mx-1" />
              </span>
            </>
          )}
        </div>
      ),
    },
    // {
    //   name: "Link",
    //   minWidth: "250px",
    //   selector: (row) => (
    //     <CopyToClipboard
    //       onCopy={() => setCopy(true)}
    //       text={` http://${window.location.host}/${slug}/candidate/apply?id=${row?.id}&user=${loginUser?.id}`}
    //     >
    //       <p
    //         style={{
    //           cursor: "pointer",
    //           marginTop: "15px",
    //           color: "blueviolet",
    //         }}
    //       >{` https://${window.location.host}/${slug}/candidate/apply?id=${row?.id}`}</p>
    //     </CopyToClipboard>
    //   ),
    // },
    {
      name: "Create_AT",
      selector: (row) => row?.createdAt?.slice(0, 10),
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "job Category",
      selector: (row) => row?.jobCategory?.jobCategory,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "No. Of Vacancy",
      selector: (row) => row?.numberOfVacancy,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Experience",
      selector: (row) => row?.minExperienceYears,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Gender",
      selector: (row) => row?.gender,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Work",
      selector: (row) => row?.workType,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Qualification",
      selector: (row) => row?.qualification,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Salary Range Start",
      selector: (row) => row?.salaryRangeStart,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Salary Range End",
      selector: (row) => row?.salaryRangeEnd,
      conditionalCellStyles: [
        {
          when: (row) => row.status == "Inactive",
          style: {
            opacity: "0.5",
          },
        },
      ],
    },
    {
      name: "Best Matches",
      minWidth: "200px",
      cell: (row) => (
        <Button
          style={
            row.status == "Inactive"
              ? { opacity: "0.5" }
              : {
                  padding: "10px",
                  backgroundColor: themecolor,
                  color: "white",
                }
          }
          onClick={() => {
            row.status != "Inactive" && handleBestMatches(row);
          }}
          color="default"
        >
          Best Matches
        </Button>
      ),
    },
  ];
  const jobOpeningCreateHandler = async () => {
    setLoading(true);
    const fm = new FormData();
    for (const key in jobOpening) {
      fm.append(key, jobOpening[key]);
    }
    fm.append("userId", loginUser?.id);
    fm.append("agencyId", user?.agencyId);
    setCreate(false);
    setLoading(true);

    await dispatch({
      type: actions.CREATE_JOBOPENING,
      payload: { data: fm, page: currentPage, perPage: perPage },
    });
  };

  const jobOpeningUpdateHandler = async () => {
    setLoading(true);
    const fm = new FormData();
    for (const key in jobOpening) {
      fm.append(key, jobOpening[key]);
    }
    fm.delete("hotvacancy");
    await dispatch({
      type: actions.UPDATE_JOBOPENING,
      payload: {
        id: jobOpening.id,
        data: fm,
        page: currentPage,
        perPage: perPage,
      },
    });
  };

  const Validations = async () => {
    const error = false;
    // debugger
    if (
      jobOpening?.industriesId?.length === 0 ||
      jobOpening?.industriesId === undefined
    )
      return tostify("Please Select industry", error);
    else if (
      jobOpening?.jobCategoryId?.length === 0 ||
      jobOpening?.jobCategoryId === undefined
    )
      return tostify("Please Select jobCategory", error);
    else if (
      jobOpening?.numberOfVacancy?.length === 0 ||
      jobOpening?.numberOfVacancy === undefined
    )
      return tostify("Please Enter Number Of Vacancy", error);
    else if (
      jobOpening?.jobStartTime?.length === 0 ||
      jobOpening?.jobStartTime === undefined
    )
      return tostify(" Please Select Job Start Time", error);
    else if (
      jobOpening?.jobEndTime?.length === 0 ||
      jobOpening?.jobEndTime === undefined
    )
      return tostify(" Please Select Job End Time", error);
    else if (
      jobOpening?.sunday?.length === 0 ||
      jobOpening?.sunday === undefined
    )
      return tostify("Please Select Sunday Option", error);
    else if (
      jobOpening?.minExperienceYears?.length === 0 ||
      jobOpening?.minExperienceYears === undefined
    )
      return tostify("Please Select Experience", error);
    else if (
      jobOpening?.gender?.length === 0 ||
      jobOpening?.gender === undefined
    )
      return tostify("Please Select Gender", error);
    else if (
      jobOpening?.workType?.length === 0 ||
      jobOpening?.workType === undefined
    )
      return tostify("Please Select Work Type Option", error);
    else if (
      jobOpening?.qualification?.length === 0 ||
      jobOpening?.qualification === undefined
    )
      return tostify("Please Select Qualification", error);
    else if (
      jobOpening?.salaryRangeStart?.length === 0 ||
      jobOpening?.salaryRangeStart === undefined
    )
      return tostify("Please Enter Salary Range Start", error);
    else if (
      jobOpening?.salaryRangeEnd?.length === 0 ||
      jobOpening?.salaryRangeEnd === undefined
    )
      return tostify("Please Enter Salary Range End", error);
    else if (
      jobOpening?.negotiable?.length === 0 ||
      jobOpening?.negotiable === undefined
    )
      return tostify("Please Select Negotiable Option", error);
    else if (
      jobOpening?.jobLocation?.length === 0 ||
      jobOpening?.jobLocation === undefined
    )
      return tostify("Please Enter Job Location", error);
    else if (
      jobOpening?.basicSkill?.length === 0 ||
      jobOpening?.basicSkill === undefined
    )
      return tostify("Please Enter Basic Skill", error);
    else if (
      jobOpening?.keyRole?.length === 0 ||
      jobOpening?.keyRole === undefined
    )
      return tostify("Please Enter Key Role And Responsibilities", error);
    return error;
  };

  const UserActionHandler = async () => {
    const err = await Validations();
    if (update === true && err === false) {
      jobOpeningUpdateHandler();
    }
    if (create === true && err === false) {
      jobOpeningCreateHandler();
    }
    if (restart == true) {
      RestartjobOpening(openingId);
    }
  };

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    getjobOpening(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    await dispatch({
      type: actions.GET_JOBOPENING,
      payload: {
        filterData,
        page,
        perPage: newPerPage,
      },
    });
    setPerPage(newPerPage);
  };

  useEffect(() => {
    setAnimation(false);
  }, []);

  const renderStates = (JobOpenings) => {
    const statesArr = [
      {
        title: "Link",
        value:
          (
            <CopyToClipboard
              onCopy={() => setCopy(true)}
              text={` http://${window.location.host}/${slug}/candidate/apply?id=${JobOpenings?.id}&user=${loginUser?.id}`}
            >
              <p
                style={{
                  cursor: "pointer",
                  color: "blueviolet",
                  marginBottom: "0px",
                }}
              >{` https://${window.location.host}/${slug}/candidate/apply?id=${JobOpenings?.id}`}</p>
            </CopyToClipboard>
          ) || "-",
      },
      {
        title: "job Category",
        value: JobOpenings?.jobCategory?.jobCategory || "-",
      },
      {
        title: "No. Of Vacancy",
        value: JobOpenings?.numberOfVacancy || "-",
      },
      {
        title: "Experience",
        value: JobOpenings?.minExperienceYears || "-",
      },
      {
        title: "Gender",
        value: JobOpenings?.gender || "-",
      },
    ];

    return statesArr.map((state) => (
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
      </>
    ));
  };

  const renderStatesMore = (JobOpenings) => {
    const statesArr = [
      {
        title: "Work",
        value: JobOpenings?.workType || "-",
      },
      {
        title: "Qualification",
        value: JobOpenings?.qualification || "-",
      },
      {
        title: "No. Of Vacancy",
        value: JobOpenings?.numberOfVacancy || "-",
      },
      {
        title: "Salary Range Start",
        value: JobOpenings?.salaryRangeStart || "-",
      },
      {
        title: "Salary Range End",
        value: JobOpenings?.salaryRangeEnd || "-",
      },
    ];

    return statesArr.map((state) => (
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
      </>
    ));
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [onBoardingToDelete, setOnBoardingToDelete] = useState(null);

  const handleDeleteClick = (result) => {
    setOnBoardingToDelete(result);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    deletejobOpening(onBoardingToDelete);
    setShowDeleteModal(false);
  };

  const totalPages = Math.ceil(JobOpenings?.total / perPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);
  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const customStyles = {
    headCells: {
      style: {
        justifyContent: "center",
        width: "150px",
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
  const [hoverIndex, setHoverIndex] = useState(0);

  const editStyle = {
    backgroundColor: hoverIndex == 2 && `${themecolor}30`,
    color: hoverIndex == 2 && themecolor,
  };
  const deleteStyle = {
    backgroundColor: hoverIndex == 3 && `${themecolor}30`,
    color: hoverIndex == 3 && themecolor,
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "end" }}>
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
          <b>Job Opening</b>
        </h3>

        <Button
          style={
            width > 769
              ? { display: "none", backgroundColor: themecolor, color: "white" }
              : {
                  width: "60px",
                  marginLeft: "auto",
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
      </div>
      {/* <Loader loading={loading} /> */}
      {/* {width > 769 && (
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

      <Row className="mt-1" style={{ transition: "all 0.5s ease-in-out" }}>
        <Col sm={12} md={12} lg={12} xl={12}></Col>
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
                  overflowY: "auto",
                  maxHeight: "600px",
                }
              : { paddingLeft: 0, paddingRight: 0 }
          }
        >
          {width < 786 && loading == true ? (
            <ComponentSpinner
              isClientCandidate={true}
              theamcolour={themecolor}
            />
          ) : (
            <>
              {JobOpenings?.results?.length > 0 ? (
                <>
                  {JobOpenings?.results?.map((result, index) => {
                    return (
                      <Card
                        key={index}
                        className={`card-browser-states`}
                        style={
                          width > 769
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
                            ></CardTitle>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "auto",
                            }}
                          ></div>
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
                                className="w-100"
                                style={editStyle}
                                onMouseEnter={() => setHoverIndex(2)}
                                onMouseLeave={() => setHoverIndex(0)}
                                onClick={() => {
                                  setJobOpening(result);
                                  setUpdate(true);
                                  setShow(true);
                                }}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                className="w-100"
                                style={deleteStyle}
                                onMouseEnter={() => setHoverIndex(3)}
                                onMouseLeave={() => setHoverIndex(0)}
                                onClick={() => handleDeleteClick(result)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
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
                                    style={{ color: themecolor }}
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
                                    style={{ color: themecolor }}
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
                    );
                  })}
                </>
              ) : (
                <Card
                  className={`card-browser-states`}
                  style={
                    width > 769
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

          {width <= 768 && JobOpenings?.results?.length > 0 && (
            <Pagination className="d-flex mt-3 align-items-center justify-content-center">
              <PaginationItem>
                <PaginationLink
                  previous
                  href="#"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                      backgroundColor: pageNumber === currentPage && themecolor,
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
          <Card
            className="overflow-hidden"
            style={width < 769 ? { display: "none" } : {}}
          >
            <div className="react-dataTable">
              <DataTable
                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
                fixedHeader={true}
                fixedHeaderScrollHeight="500px"
                noHeader
                subHeader
                sortServer
                pagination
                responsive
                progressPending={loading}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={totalRows}
                paginationServer
                allowRowEvents
                progressComponent={
                  <ComponentSpinner
                    isClientCandidate={true}
                    theamcolour={themecolor}
                  />
                }
                customStyles={customStyles}
                highlightOnHover={true}
                columns={columns}
                className="react-dataTable"
                data={jobOpeningList}
                subHeaderComponent={
                  <CustomHeader
                    setShow={setShow}
                    setCreate={setCreate}
                    store={JobOpenings?.results}
                  />
                }
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        className="modal-dialog-centered"
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(!showDeleteModal)}
      >
        <ModalHeader toggle={() => setShowDeleteModal(!showDeleteModal)}>
          Confirm
        </ModalHeader>
        <ModalBody>Are you sure to delete this Job Opening?</ModalBody>
        <ModalFooter>
          <Button
            color="default"
            style={{ backgroundColor: themecolor, color: "white" }}
            onClick={confirmDelete}
          >
            Yes, Delete
          </Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {show === true ? (
        <>
          <JobOpeningDialog
            loading={loading}
            show={show}
            update={update}
            RestartjobOpening={RestartjobOpening}
            restart={restart}
            setShow={setShow}
            jobOpening={jobOpening}
            setJobOpening={setJobOpening}
            UserActionHandler={UserActionHandler}
            setUpdate={setUpdate}
            setCreate={setCreate}
          />
        </>
      ) : null}
    </>
  );
};

export default JobOpening;
