/*eslint-disable */
import DataTable from "react-data-table-component";
import {
  Edit,
  Delete,
  Image,
  Trash,
  Filter as FilterIcon,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
} from "react-feather";
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
  UncontrolledDropdown,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../components/Header/CustomHeader";
import Filter from "../../components/Forms/hotVacancy/filter";
import jsPDF from "jspdf";
import JobCate from "../../components/Dialog/JobCate";
import userActions from "../../redux/user/actions";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import UserDialog from "../../components/Dialog/UserDialog";
import { tostify } from "../../components/Tostify";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";
// import { uploadFiles } from './../../helper/fileUpload'
import Loader from "./../../components/Dialog/Loader";
import { toast } from "react-toastify";
import { awsUploadAssetsWithResp } from "../../helper/awsUploadAssets";
import planActions from "../../redux/plan/actions";
import useBreakpoint from "../../utility/hooks/useBreakpoints";
import HotVacancyDialog from "../../components/Dialog/HotVacancyDialog";
import hotVacancyActions from "../../redux/hotVacancy/actions";
import autoTable from "jspdf-autotable";

const HotVacancy = () => {
  const { width } = useBreakpoint();
  const dispatch = useDispatch();
  const { hotVacancy } = useSelector((state) => state.hotVacancy);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [filterToggleMode, setFilterToggleMode] = useState(false);
  const [isOpen, setIsOpen] = useState(
    hotVacancy?.results?.map(() => false) ?? []
  );

  console.info("----------------------------");
  console.info("filterData =>", filterData);
  console.info("----------------------------");

  const toggle = (index) => {
    const newCollapseStates = [...isOpen];
    newCollapseStates[index] = !newCollapseStates[index];
    setIsOpen(newCollapseStates);
  };
  const getHotVacancy = async (page) => {
    await dispatch({
      type: hotVacancyActions.GET_HOT_VACANCY,
      payload: {
        filterData,
        page,
        perPage,
      },
    });
  };

  useEffect(() => {
    if (filterData.length !== 0) {
      //  getOnBoarding(1);
      getHotVacancy(1);
    }
  }, [filterData]);

  useEffect(() => {
    getHotVacancy(1);
  }, []);

  useEffect(() => {
    if (!show) setUser([]);
  }, [show]);

  const generatePDF = (row) => {
    const doc = new jsPDF();
    const jobStartTime = new Date(row?.jobStartTime);
    const jobEndTime = new Date(row?.jobEndTime);
    const capitalizeFirstLetter = (str) => {
      if (typeof str !== "string" || !str.trim()) return "N/A";
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const formatDate = (date) => {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };
    const formattedJobStartTime = formatDate(jobStartTime);
    const formattedJobEndTime = formatDate(jobEndTime);

    const companyDetails = [
      ["Company Name", capitalizeFirstLetter(row?.clients?.companyName)],
      ["Owner Name", capitalizeFirstLetter(row?.clients?.companyowner)],
      ["Company Mobile", row?.clients?.mobile],
      ["Company email", capitalizeFirstLetter(row?.clients?.email)],
    ];

    const data = [
      ["Industries", capitalizeFirstLetter(row?.industries?.industryCategory)],
      ["Job Category", capitalizeFirstLetter(row?.jobCategory?.jobCategory)],
      ["Designation", capitalizeFirstLetter(row?.designation)],
      ["Qualification", capitalizeFirstLetter(row?.qualification)],
      ["No. of Vacancy", row?.numberOfVacancy],
      ["Job Time", `${formattedJobStartTime} to ${formattedJobEndTime}`],
      [
        "Min. Experience (In Years)",
        capitalizeFirstLetter(row?.minExperienceYears),
      ],
      ["Education", capitalizeFirstLetter(row?.field)],
      ["Basic Skills", capitalizeFirstLetter(row?.basicSkill)],
      ["Key Role and Responsibilities", capitalizeFirstLetter(row?.keyRole)],
      ["Gender", capitalizeFirstLetter(row?.gender)],
      ["Work", capitalizeFirstLetter(row?.workType)],
      ["Salary Range", `${row?.salaryRangeStart} to ${row?.salaryRangeEnd} `],
      ["Negotiable", capitalizeFirstLetter(row?.negotiable)],
      ["Job Location (Full Address)", row?.jobLocation],
    ];

    const benefits = [
      ["Working Days", capitalizeFirstLetter(row?.workingDays)],
      ["PL/SL/CL (Paid/Sick/Casual leave)", capitalizeFirstLetter(row?.plSlCl)],
      ["PF/ESIC", capitalizeFirstLetter(row?.pfEsic)],
      ["Health Policy", capitalizeFirstLetter(row?.healthPolicy)],
      ["Other", capitalizeFirstLetter(row?.other)],
    ];
    const columns = ["Company Details", " "];
    const columns2 = ["Job description", " "];
    const columns3 = ["Benefits for Employees", " "];
    const startY = 10;
    doc.autoTable({
      head: [columns],
      body: companyDetails,
      startY: startY,
    });

    const firstSectionHeight = doc.previousAutoTable.finalY || startY;

    const spacer = 10;
    doc.autoTable({
      head: [columns2],
      body: data,
      startY: firstSectionHeight + spacer,
    });

    const secondSectionHeight =
      doc.previousAutoTable.finalY || firstSectionHeight + spacer;

    // Third autoTable
    doc.autoTable({
      head: [columns3],
      body: benefits,
      startY: secondSectionHeight + spacer,
    });
    // Save the PDF
    doc.save("content.pdf");
  };

  const columns = [
    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => (
        <div div className="column-action d-flex align-items-center">
          {row.fullname}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              generatePDF(row);
            }}
          >
            <Download size={17} className="mx-1" />
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUser(row);
              setShow(true);
            }}
          >
            <Edit size={17} className="mx-1" />
          </span>
        </div>
      ),
    },
    {
      name: "Company Name",
      selector: (row) => row?.clients?.companyName,
    },
    {
      name: "Company Owner",
      selector: (row) => row?.clients?.companyowner,
    },
    {
      name: "Company email",
      selector: (row) => row?.clients?.email,
    },
    {
      name: "Company Number",
      selector: (row) => row?.clients?.mobile,
    },
    {
      name: "Create_AT",
      selector: (row) => row?.createdAt?.slice(0, 10),
    },
    {
      name: "Job Category",
      selector: (row) => row?.jobCategory?.jobCategory,
    },
    {
      name: "Industries",
      selector: (row) => row?.industries?.industryCategory,
    },
    {
      name: "Number Of Vacancy",
      selector: (row) => row?.numberOfVacancy,
    },
    {
      name: "Experience",
      selector: (row) => row?.minExperienceYears,
    },
    {
      name: "Gender",
      selector: (row) => row?.gender,
    },
    {
      name: "Work",
      selector: (row) => row?.workType,
    },
    {
      name: "Qualification",
      selector: (row) => row?.qualification,
    },
    {
      name: "Salary Range Start",
      selector: (row) => row?.salaryRangeStart,
    },
    {
      name: "Salary Range End",
      selector: (row) => row?.salaryRangeEnd,
    },
  ];

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    await dispatch({
      type: "GET_USER",
      payload: {
        filterData,
        page,
        perPage: newPerPage,
      },
    });
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
    setFilterData([]);
    dispatch({
      type: hotVacancyActions.GET_HOT_VACANCY,
      payload: {
        filterData: [],
        page: 1,
        perPage: 10,
      },
    });
  };
  const setclearstate = (clear) => {
    setclear(clear);
  };

  const filterToggle = () => {
    setFilterToggleMode(!filterToggleMode);
  };

  const [currentPage, setCurrentPage] = useState(1);

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
  const renderStates = (hotVacancy) => {
    const statesArr = [
      {
        title: "Company name",
        value: hotVacancy?.clients?.companyName || "-",
      },
      {
        title: "Company Owner",
        value: hotVacancy?.clients?.companyowner || "-",
      },
      {
        title: "Company Number",
        value: hotVacancy?.clients?.mobile || "-",
      },
      {
        title: "Email",
        value: hotVacancy?.clients?.email || "-",
      },
      {
        title: "Job Category",
        value: hotVacancy?.jobCategory?.jobCategory || "-",
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

  const renderStatesMore = (hotVacancy) => {
    const statesArr = [
      {
        title: "Industries",
        value: hotVacancy?.industries?.industryCategory || "-",
      },
      {
        title: "Number Of Vacancy",
        value: hotVacancy?.numberOfVacancy || "-",
      },

      {
        title: "Experience",
        value: hotVacancy?.minExperienceYears || "-",
      },
      {
        title: "Gender",
        value: hotVacancy?.gender || "-",
      },
      {
        title: "Work",
        value: hotVacancy?.workType || "-",
      },
      {
        title: "Qualification",
        value: hotVacancy?.qualification || "-",
      },

      {
        title: "Salary Range Start",
        value: hotVacancy?.salaryRangeStart || "-",
      },
      {
        title: "Salary Range End",
        value: hotVacancy?.salaryRangeEnd || "-",
      },
      {
        title: "Create_AT",
        value: hotVacancy?.createdAt?.slice(0, 10) || "-",
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

  const totalPages = Math.ceil(hotVacancy?.total / perPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);
  const [hoverIndex, setHoverIndex] = useState(0);

  const editStyle = {
    backgroundColor: hoverIndex == 2 && `${themecolor}30`,
    color: hoverIndex == 2 && themecolor,
  };
  const deleteStyle = {
    backgroundColor: hoverIndex == 3 && `${themecolor}30`,
    color: hoverIndex == 3 && themecolor,
  };
  const keys = Object.keys(filterData).filter(
    (key) => key !== "salaryRangeStart"
  );
  const length = keys.length;
  return (
    <>
      <div style={{ display: "flex", alignItems: "end" }}>
        <h3 style={{ color: themecolor }}>
          <b>Hot Vacancy</b>
        </h3>
        {Object.keys(filterData).length > 0 ? (
          <div
            style={{ marginLeft: "auto", display: "flex", alignItems: "end" }}
          >
            {width > 786 ? (
              <h3 style={{ fontSize: "16px", marginBottom: "9px" }}>
                No Of Filter Applied : {length}
              </h3>
            ) : null}

            <Button
              className="add-new-user "
              color="link"
              onClick={handleClear}
              style={{ color: themecolor }}
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
                    Object.keys(filterData).length > 0 ? "10px" : "auto",
                  backgroundColor: themecolor,
                  color: "white",
                }
              : {
                  width: "60px",
                  marginLeft:
                    Object.keys(filterData).length > 0 ? "10px" : "auto",
                  backgroundColor: themecolor,
                  color: "white",
                }
          }
          color="default"
          onClick={() => {
            setFilterData([]);
            filterToggle();
          }}
        >
          {width > 769 ? "Filter Data" : <FilterIcon size={17} />}
        </Button>
      </div>
      <Row className="mt-1" style={{ transition: "all 0.5s ease-in-out" }}>
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
            handleFilterToggleMode={handleFilterToggleMode}
            clear={clear}
            setclear={setclearstate}
            open={filterToggleMode}
            setFilterData={setFilterData}
            toggleSidebar={filterToggle}
            filterData={filterData}
            setFilterToggleMode={setFilterToggleMode}
            handleFilter={handleFilter}
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
              {hotVacancy?.results?.length > 0 ? (
                <>
                  {hotVacancy?.results?.map((result, index) => {
                    return (
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
                            ></CardTitle>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "auto",
                            }}
                          >
                            {" "}
                            <div
                              style={{
                                color: "#7F8487",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                generatePDF(result);
                              }}
                            >
                              <Download size={17} className="mx-1" />
                            </div>
                            <div
                              style={{
                                color: "#7F8487",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setUser(result);
                                setShow(true);
                              }}
                            >
                              <Edit size={17} className="mx-1" />
                            </div>
                          </div>
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
            hotVacancy?.results?.length > 0 && (
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
          <Card
            className="overflow-hidden"
            style={width < 769 ? { display: "none" } : {}}
          >
            <div className="react-dataTable">
              {/* <Loader loading={loading} /> */}
              <DataTable
                paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
                fixedHeader={true}
                fixedHeaderScrollHeight="500px"
                noHeader
                subHeader
                sortServer
                pagination
                responsive
                customStyles={customStyles}
                progressPending={loading}
                progressComponent={
                  <ComponentSpinner
                    isClientCandidate={true}
                    theamcolour={themecolor}
                  />
                }
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                paginationTotalRows={hotVacancy?.total || 0}
                paginationServer
                allowRowEvents
                highlightOnHover={true}
                columns={columns}
                className="react-dataTable"
                data={hotVacancy?.results || []}
              />
            </div>
          </Card>
        </Col>
      </Row>
      {show === true ? (
        <>
          <HotVacancyDialog
            loading={loading}
            show={show}
            setShow={setShow}
            user={user}
          />
        </>
      ) : null}
    </>
  );
};

export default HotVacancy;
