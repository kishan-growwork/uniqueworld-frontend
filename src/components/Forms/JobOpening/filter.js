import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select";

import {
  Row,
  Col,
  Card,
  Input,
  Label,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
} from "reactstrap";

import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useDispatch, useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import course from "./../Course";
import actions from "./../../../redux/onBoarding/actions";

const initialState = {
  status: "",
  userId: "",
  companyName: "",
  companyOwner: "",
  companyContactNo: "",
  companyEmail: "",
  companyState: "",
  jobCategoryId: "",
  numberOfVacancy: "",
  minExperienceYears: "",
  gender: "",
  workType: "",
  qualification: "",
  salaryRangeStart: "",
  salaryRangeEnd: "",
};

const Filter = ({ setFilterData, users, handleFilter = () => {} }) => {
  const dispatch = useDispatch();
  const jobCategories = useSelector((state) => state.jobCategory.results);
  const [filter, setFilter] = useState(initialState);
  const [status, setStatus] = useState();
  const [selectTempUser, setSelectTempUser] = useState();
  const [jobCategoryOptions, setJobCategoryOptions] = useState();
  const [jobCategory, setjobCategory] = useState();
  const [experienceInYear, setExperienceInYear] = useState();
  const [gender, setGender] = useState();
  const [work, setWork] = useState();
  const [qua, setQua] = useState();
  const [field, setField] = useState();
  const [subCourse, setSubCourse] = useState();
 
  useEffect(() => {
    if (jobCategories?.length > 0) {
      jobCategories.filter((item) => {
        item.label = item.jobCategory;
        item.value = item.id;
        item.id = "jobCategoryId";
        return item;
      });
      setJobCategoryOptions(jobCategories);
    }
  }, [jobCategories]);

  const genderOptions = [
    { value: "male", id: "gender", label: "Male" },
    { value: "female", id: "gender", label: "Female" },
    { value: "both", id: "gender", label: "Both" },
  ];

  const statusOptions = [
    { value: "newCV", id: "status", label: "New CV" },
    { value: "following", id: "status", label: "Following" },
    { value: "hold", id: "status", label: "Hold" },
    { value: "fullField", id: "status", label: "fullField" },
    { value: "sideBySide", id: "status", label: "Side By Side" },
  ];

  const experienceOptions = [
    { value: "0-1 year", id: "minExperienceYears", label: "0-1 Year" },
    { value: "1-3 year", id: "minExperienceYears", label: "1-3 Year" },
    { value: "3-5 year", id: "minExperienceYears", label: "3-5 Year" },
    { value: "5 year above", id: "minExperienceYears", label: "5 Year Above" },
  ];

  const workOptions = [
    { value: "inhouse", id: "workType", label: "Inhouse" },
    { value: "field", id: "workType", label: "Field" },
    { value: "both", id: "workType", label: "Both" },
  ];

  const qualification = [
    { value: "under graduate", id: "qualification", label: "Under Graduate" },
    { value: "graduation", id: "qualification", label: "Graduation" },
    { value: "post graduate", id: "qualification", label: "Post Graduate" },
    { value: "any", id: "qualification", label: "Any" },
  ];

  const handleFilterChange = (id, value) => {
    setFilter({ ...filter, [id]: value });
  };

  const handleFilterData = () => {
    const filterdata = {};
    for (const key in filter) {
      if (filter[key].length > 0) {
        filterdata[key] = filter[key];
      }
    }
    if (status?.value?.length > 0) {
      filterdata.status = status.value;
    }
    if (selectTempUser?.name?.length > 0) {
      filterdata.userId = selectTempUser.id;
    }
    if (jobCategory?.value?.length > 0) {
      filterdata.jobCategoryId = jobCategory.value;
    }
    if (experienceInYear?.value?.length > 0) {
      filterdata.minExperienceYears = experienceInYear.value;
    }
    if (gender?.value?.length > 0) {
      filterdata.gender = gender.value;
    }
    if (work?.value?.length > 0) {
      filterdata.workType = work.value;
    }
    if (qua?.value?.length > 0) {
      filterdata.qualification = qua.value;
    }
    handleFilter(filterdata);
  };
  const handleClear = () => {
    setStatus({ value: "", label: "Select Status" });
    setSelectTempUser({ value: "", label: "Select Recruiter" });
    setExperienceInYear({ value: "", label: "Select Experience" });
    setGender({ value: "", label: "Select Gender" });
    setWork({ value: "", label: "Select WorkType" });
    setQua({ value: "", label: "Select Qualification" });
    setFilter(initialState);

    dispatch({
      type: actions.GET_ONBOARDING,
      payload: {
        filterData: [],
        page: 1,
        perPage: 10,
      },
    });
    setFilterData([]);
    setSubCourse({ label: "Select Field" });
    setField({ label: "Select Course" });
  };
  useEffect(() => {
    setSubCourse(null);
  }, [field]);
  return (
    <>
      <Fragment>
        <Card style={{ height: "calc(100vh - 258px)", marginBottom: 0 }}>
          <CardHeader>
            <CardTitle tag="h4">Filters</CardTitle>
            <Button
              style={{ position: "absolute", right: "80px" }}
              className="add-new-user"
              color="link"
              onClick={handleFilterData}
            >
              Search
            </Button>
            <Button
              className="add-new-user "
              color="link"
              onClick={handleClear}
            >
              Clear
            </Button>
          </CardHeader>
          <CardBody>
            <Scrollbars style={{ height: "100%" }} autoHide>
              <Row noGutters>
                <Col md="12" className="mt-1">
                  <Label id="name">Status</Label>
                  <Select
                    menuPlacement="auto"
                    id="status"
                    value={status}
                    placeholder="Select Status"
                    options={statusOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setStatus(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label for="role-select">Select Recruiter </Label>
                  <Select
                    menuPlacement="auto"
                    id="recruiterId"
                    value={selectTempUser}
                    placeholder="Select Recruiter"
                    options={users?.filter((ele) => {
                      if (ele?.role?.name === "Recruitor") {
                        ele.label = ele.name;
                      }
                      return ele?.role?.name === "Recruitor";
                    })}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setSelectTempUser(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    className="w-100"
                    type="text"
                    maxLength={200}
                    placeholder={"Enter company name"}
                    value={filter?.companyName}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/[^a-z]/gi, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="companyowner">Company Owner</Label>
                  <Input
                    id="companyOwner"
                    name="companyOwner"
                    className="w-100"
                    type="text"
                    maxLength={200}
                    value={filter?.companyOwner}
                    placeholder={"Enter company owner"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/[^a-z]/gi, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="companyContactNo">Contact Number</Label>
                  <Input
                    id="companyContactNo"
                    name="companyContactNo"
                    className="w-100"
                    type="text"
                    maxLength={10}
                    value={filter?.companyContactNo}
                    placeholder={"Enter contact number"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/\D/g, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="companyEmail">Email</Label>
                  <Input
                    id="companyEmail"
                    name="companyEmail"
                    className="w-100"
                    type="text"
                    maxLength={200}
                    value={filter?.companyEmail}
                    placeholder={"Enter Email"}
                    onChange={(e) => {
                      handleFilterChange(e.target.id, e.target.value);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="companyState">State</Label>
                  <Input
                    id="companyState"
                    name="companyState"
                    className="w-100"
                    maxLength={200}
                    type="text"
                    value={filter?.companyState}
                    placeholder={"Enter State"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/[^a-z]/gi, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="jobCategoryId">jobCategory</Label>
                  <Select
                    menuPlacement="auto"
                    id="jobCategoryId"
                    value={jobCategory}
                    placeholder="Select jobCategory"
                    options={jobCategoryOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setjobCategory(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <div>
                    <Label>Education</Label>
                    <Select
                      menuPlacement="auto"
                      style={{ cursor: "pointer" }}
                      id="field"
                      name="field"
                      value={field}
                      placeholder="Select field"
                      options={course?.map((ele) => {
                        ele = { label: ele.name, id: "field", value: ele.sub };
                        return ele;
                      })}
                      className="react-select"
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      onChange={(e) => {
                        setField(e);
                        handleFilterChange(e.id, e.label);
                        // setFieldValue(e.id, e.label)
                      }}
                    />
                  </div>
                </Col>
                <Col md="12" className="mt-1">
                  <div>
                    <Label>Course</Label>
                    <Select
                      menuPlacement="auto"
                      style={{ cursor: "pointer" }}
                      id="course"
                      name="course"
                      value={subCourse}
                      placeholder="Select course"
                      options={field?.value?.map((ele) => {
                        ele = {
                          label: ele,
                          field: field?.label,
                          id: "course",
                          value: ele,
                        };
                        return ele;
                      })}
                      className="react-select"
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      onChange={(e) => {
                        setSubCourse(e);
                        handleFilterChange(e.id, e.value);
                      }}
                    />
                  </div>
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="companyEmail">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    className="w-100"
                    maxLength={200}
                    type="text"
                    value={filter?.designation}
                    placeholder={"Enter designation"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/[^a-z]/gi, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="numberOfVacancy">No. of Vacancy</Label>
                  <Input
                    id="numberOfVacancy"
                    name="numberOfVacancy"
                    className="w-100"
                    type="text"
                    maxLength={7}
                    value={filter?.numberOfVacancy}
                    placeholder={"Enter number of vacancy"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/\D/g, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="experience">Min. Experience (In Years)</Label>
                  <Select
                    menuPlacement="auto"
                    style={{ cursor: "pointer" }}
                    id="minExperienceYear"
                    name="minExperienceYear"
                    value={experienceInYear}
                    placeholder="Select Experience"
                    options={experienceOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setExperienceInYear(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label for="role-select">Gender</Label>
                  <Select
                    menuPlacement="auto"
                    id="gender"
                    value={gender}
                    placeholder="Select Gender"
                    options={genderOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setGender(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label for="workType">Work</Label>
                  <Select
                    menuPlacement="auto"
                    id="workType"
                    value={work}
                    placeholder="Select work"
                    options={workOptions}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setWork(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="qualification">Qualification</Label>
                  <Select
                    menuPlacement="auto"
                    id="qualification"
                    value={qua}
                    placeholder="Select qualification"
                    options={qualification}
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setQua(e);
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="salaryRangeStart">Salary Range Start</Label>
                  <Input
                    id="salaryRangeStart"
                    name="salaryRangeStart"
                    type="text"
                    maxLength={9}
                    value={filter?.salaryRangeStart}
                    placeholder={"Enter salary"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/\D/g, "")
                      );
                    }}
                  />
                </Col>
                <Col md="12" className="mt-1">
                  <Label id="salaryRangeEnd">Salary Range End</Label>
                  <Input
                    id="salaryRangeEnd"
                    name="salaryRangeEnd"
                    type="text"
                    maxLength={9}
                    value={filter?.salaryRangeEnd}
                    placeholder={"Enter salary"}
                    onChange={(e) => {
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/\D/g, "")
                      );
                    }}
                  />
                </Col>
              </Row>
            </Scrollbars>
          </CardBody>
        </Card>
      </Fragment>
    </>
  );
};

export default Filter;
