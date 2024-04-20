import React, { useEffect, useState } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { selectThemeColors } from "@utils";
import Select from "react-select";
import actions from "../../../redux/industries/actions";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import course from "./../Course";
import { toast } from "react-toastify";
import jobCategoryActions from "../../../redux/jobCategory/actions";

const Professional = ({
  candidate,
  industriesData,
  setCandidate,
  update,
  isDisabledAllFields,
}) => {
  const jobCategory = useSelector((state) => state.jobCategory.results);
  const industries = useSelector((state) => state.industries);

  const dispatch = useDispatch();
  const [quelification, setQuelification] = useState();
  const [field, setField] = useState();
  const [industriesOptions, setIndustriesOptions] = useState([]);
  const [subCourse, setSubCourse] = useState();
  const [experienceInYear, setExperienceInYear] = useState([]);
  const [selectindustries, setSelectIndustries] = useState([]);
  const [noticePeriod, setNoticePeriod] = useState();
  const [currentlyWorking, setCurrentlyWorking] = useState();
  const [jobCategoryOptions, setJobCategoryOptions] = useState([]);
  const [jobCat, setJobCat] = useState();
  const [eng, setEng] = useState([]);

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_INDUSTRIES,
    });
    dispatch({
      type: jobCategoryActions.GET_ALL_JOBCAT,
    });
  }, []);

  useEffect(() => {
    if (jobCategory?.length > 0) {
      jobCategory.filter((item) => {
        item.label = item.jobCategory;
        return item;
      });
      setJobCategoryOptions(jobCategory);
    }
  }, [jobCategory]);

  useEffect(() => {
    if (industriesData?.length > 0) {
      const selected = [];
      industriesData.forEach((ele) => {
        ele.label = ele?.industries?.industryCategory;
        ele.value = ele?.industries?.id;
        selected.push(ele);
      });
      setSelectIndustries(selected);
    }
  }, [industriesData]);

  useEffect(() => {
    if (industries?.length > 0) {
      setIndustriesOptions(industries);
    }
  }, [industries]);
  const Quelification = [
    {
      value: "under graduate",
      id: "highestQualification",
      label: "Under Graduate",
    },
    { value: "graduation", id: "highestQualification", label: "Graduation" },
    {
      value: "post graduate",
      id: "highestQualification",
      label: "Post Graduate",
    },
  ];

  const English = [
    { value: "Poor", id: "english", label: "Poor" },
    { value: "Average", id: "english", label: "Average" },
    { value: "Excellent", id: "english", label: "Excellent" },
  ];

  const experienceOptions = [
    { value: "0-1 year", id: "experienceInyear", label: "0-1 Year" },
    { value: "1-3 year", id: "experienceInyear", label: "1-3 Year" },
    { value: "3-5 year", id: "experienceInyear", label: "3-5 Year" },
    { value: "5 year above", id: "experienceInyear", label: "5 Year Above" },
  ];
  const NoticePeriodOptions = [
    { value: "none", id: "noticePeriod", label: "None" },
    { value: "1-15 days", id: "noticePeriod", label: "1-15 Days" },
    { value: "15-30 days", id: "noticePeriod", label: "15-30 Days" },
    { value: "30-45 days", id: "noticePeriod", label: "30-45 Days" },
  ];
  const currentlyWorkingOptions = [
    { value: "yes", id: "currentlyWorking", label: "Yes" },
    { value: "no", id: "currentlyWorking", label: "No" },
  ];
  useEffect(() => {
    if (update === true && candidate?.professional?.field?.length > 0) {
      if (
        subCourse?.field === candidate?.professional?.field ||
        subCourse?.field === undefined
      ) {
        setSubCourse({
          label: candidate?.professional?.course,
          field: field?.label,
          value: candidate?.professional?.course,
        });
      } else {
        setSubCourse(null);
      }
    } else {
      setSubCourse(null);
    }
  }, [field]);

  const onIndustriesChange = (industry) => {
    const data = [];
    industry?.map((ele) => {
      if (ele.c_Id === undefined) {
        data.push({ industriesId: ele.value });
      } else {
        data.push(ele);
      }
    });
    setCandidate({ ...candidate, industries_relation: data });
  };
  const [calculatedExpectedSalary, setCalculatedExpectedSalary] = useState(
    "Current Monthly Salary + 20%"
  );

  const themecolor = localStorage.getItem("themecolor");
  const [focus, setIsfocus] = useState(null);

  return (
    <div>
      <Formik initialValues={{}}>
        {({ values, setFieldValue }) => {
          useEffect(() => {
            if (candidate?.id) {
              for (const key in candidate?.professional) {
                setFieldValue(key, candidate?.professional[key]);
              }
              if (candidate?.professional?.experienceInyear?.length > 0) {
                setExperienceInYear({
                  label: candidate?.professional?.experienceInyear,
                  value: candidate?.professional?.experienceInyear,
                });
              }
              if (candidate?.professional?.highestQualification?.length > 0) {
                let label = "12th";
                const value = candidate?.professional?.highestQualification;
                if (value === "graduation") label = "Graduation";
                if (value === "post graduate") label = "Post Graduate";
                if (value === "under graduate") label = "Under Graduate";
                setQuelification({ value, label, id: "highestQualification" });
              }
              if (candidate?.professional?.jobCategoryId?.length > 0) {
                setJobCat({
                  label: candidate?.professional?.jobCategory?.jobCategory,
                  value: candidate?.professional?.jobCategoryId,
                });
              }
              if (candidate?.professional?.noticePeriod?.length > 0) {
                setNoticePeriod({
                  label: candidate?.professional?.noticePeriod,
                  value: candidate?.professional?.noticePeriod,
                });
              }
              if (candidate?.professional?.english?.length > 0) {
                setEng({
                  label: candidate?.professional?.english,
                  value: candidate?.professional?.english,
                  id: "english",
                });
              }

              if (candidate?.professional?.currentlyWorking?.length > 0) {
                setCurrentlyWorking({
                  label: candidate?.professional?.currentlyWorking,
                  value: candidate?.professional?.currentlyWorking,
                });
              }
              if (candidate?.professional?.field?.length > 0) {
                course.filter((ele) => {
                  if (ele.name === candidate?.professional?.field) {
                    setField({ value: ele.sub, label: ele.name });
                  }
                });
              }
            }
          }, []);
          useEffect(() => {
            if (!isNaN(values.currentSalary)) {
              const calculatedSalary = parseFloat(values.currentSalary) * 1.20;

              if (isNaN(calculatedSalary)) {
                setCalculatedExpectedSalary("Current Monthly Salary + 20%");
              }
              if (!isNaN(calculatedSalary)) {
                setCalculatedExpectedSalary(calculatedSalary.toFixed(0));
                setFieldValue("expectedsalary", calculatedSalary.toFixed(0));
              }
            } else {
            }
          }, [values.currentSalary]);
          useEffect(() => {
            if (values.jobCategory) {
              delete values?.jobCategory;
            }
            candidate.professional = values;
          }, [values]);
          return (
            <Form>
              <div>
                {" "}
                <Row className="gy-1 pt-75" style={{ marginTop: "10px" }}>
                  <div>
                    <h4>Professional Details</h4>
                  </div>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Industries</Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="industries"
                        name="industries"
                        value={selectindustries}
                        isMulti
                        placeholder="Select Industries"
                        isDisabled={isDisabledAllFields}
                        options={industriesOptions?.filter((ele) => {
                          ele.label = ele?.industryCategory;
                          ele.value = ele?.id;
                          return ele;
                        })}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          if (e.length <= 3) {
                            setSelectIndustries(e);
                            onIndustriesChange(e);
                          } else toast.warn("Only 3 industries can select");
                        }}
                      />
                      <p style={{ color: "red", fontSize: "12px" }}>
                        *You Can select 3 industries
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Experience </Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="experienceInyear"
                        name="experienceInyear"
                        value={experienceInYear}
                        placeholder="Select Experience"
                        options={experienceOptions}
                        isDisabled={isDisabledAllFields}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setExperienceInYear(e);
                          setFieldValue("experienceInyear", e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>
                        Qualification Held
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="highestQualification"
                        name="highestQualification"
                        value={quelification}
                        placeholder="Select Qualification"
                        options={Quelification}
                        isDisabled={isDisabledAllFields}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setQuelification(e);
                          setFieldValue(e.id, e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>
                        Education<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="field"
                        name="field"
                        value={field}
                        isDisabled={isDisabledAllFields}
                        placeholder="Select Education"
                        options={course?.map((ele) => {
                          ele = {
                            label: ele.name,
                            id: "field",
                            value: ele.sub,
                          };
                          return ele;
                        })}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setField(e);
                          setFieldValue(e.id, e.label);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Course</Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="course"
                        name="course"
                        value={subCourse}
                        placeholder="Select course"
                        isDisabled={isDisabledAllFields}
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
                          setFieldValue(e.id, e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>
                        Designation<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        id="designation"
                        name="designation"
                        onFocus={() => setIsfocus("designation")}
                        onBlur={() => setIsfocus(null)}
                        style={{
                          borderColor: focus === "designation" && themecolor,
                        }}
                        value={values?.designation}
                        maxLength={200}
                        className="w-100"
                        type="text"
                        disabled={isDisabledAllFields}
                        placeholder={"Enter designation"}
                        // value={candidate?.professional?.expectedsalary}
                        // onChange={(e) => handleChangeProfessional(e)}
                        onChange={(e) =>
                          setFieldValue(
                            e.target.name,
                            e.target.value.replace(/[^a-z /]/gi, "")
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>
                        Job Category<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="jobCategoryId"
                        name="jobCategoryId"
                        value={jobCat}
                        isDisabled={isDisabledAllFields}
                        placeholder="Select jobCategory"
                        options={jobCategoryOptions}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setJobCat(e);
                          setFieldValue("jobCategoryId", e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Current Employer</Label>
                      <Input
                        id="currentEmployer"
                        onFocus={() => setIsfocus("currentEmployer")}
                        onBlur={() => setIsfocus(null)}
                        style={{
                          borderColor:
                            focus === "currentEmployer" && themecolor,
                        }}
                        name="currentEmployer"
                        className="w-100"
                        value={values?.currentEmployer}
                        type="text"
                        maxLength={200}
                        disabled={isDisabledAllFields}
                        placeholder={"Current Employer"}
                        // value={candidate?.professional?.currentEmployer}
                        onChange={(e) =>
                          setFieldValue(
                            e.target.name,
                            e.target.value.replace(/[^a-z ^0-9 / , -]/gi, "")
                          )
                        }

                        // onChange={(e) => handleChangeProfessional(e)}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Last/Current Monthly Salary</Label>
                      <Input
                        id="currentSalary"
                        onFocus={() => setIsfocus("currentSalary")}
                        onBlur={() => setIsfocus(null)}
                        style={{
                          borderColor: focus === "currentSalary" && themecolor,
                        }}
                        name="currentSalary"
                        className="w-100"
                        maxLength={10}
                        type="text"
                        disabled={isDisabledAllFields}
                        value={values?.currentSalary}
                        placeholder={"Enter Current Monthly Salary"}
                        onChange={(e) =>
                          setFieldValue(
                            e.target.name,
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Expected Monthly Salary</Label>
                      <Input
                        disabled
                        id="expectedsalary"
                        onFocus={() => setIsfocus("expectedsalary")}
                        onBlur={() => setIsfocus(null)}
                        style={{
                          borderColor: focus === "expectedsalary" && themecolor,
                        }}
                        name="expectedsalary"
                        value={calculatedExpectedSalary}
                        className="w-100"
                        type="text"
                        maxLength={10}
                        placeholder={"Current Monthly Salary + 20%"}
                        // value={candidate?.professional?.expectedsalary}
                        // onChange={(e) => handleChangeProfessional(e)}
                        onChange={(e) =>
                          setFieldValue(
                            e.target.name,
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                      />
                      <p style={{ color: "red", fontSize: "12px" }}>
                        *Expected salary will be nagotiable depanding upon
                        inerview
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Notice Period</Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="noticePeriod"
                        name="noticePeriod"
                        value={noticePeriod}
                        isDisabled={isDisabledAllFields}
                        placeholder="Select noticePeriod"
                        options={NoticePeriodOptions}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setNoticePeriod(e);
                          setFieldValue(e.id, e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Currently Working</Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="currentlyWorking"
                        name="currentlyWorking"
                        value={currentlyWorking}
                        placeholder="Select Working"
                        isDisabled={isDisabledAllFields}
                        options={currentlyWorkingOptions}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setCurrentlyWorking(e);
                          setFieldValue(e.id, e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>
                        How About your English in Speaking ?
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Select
                        style={{ cursor: "pointer" }}
                        id="english"
                        name="english"
                        value={eng}
                        placeholder="English level"
                        options={English}
                        isDisabled={isDisabledAllFields}
                        className="react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        onChange={(e) => {
                          setEng(e);
                          setFieldValue(e.id, e.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>
                        Enter Preferred Job Location{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        id="preferedJobLocation"
                        onFocus={() => setIsfocus("preferedJobLocation")}
                        onBlur={() => setIsfocus(null)}
                        style={{
                          borderColor:
                            focus === "preferedJobLocation" && themecolor,
                        }}
                        name="preferedJobLocation"
                        value={values?.preferedJobLocation}
                        disabled={isDisabledAllFields}
                        className="w-100"
                        maxLength={200}
                        type="text"
                        placeholder={"Eg: Vesu, Adajan, Kamrej"}
                        onChange={(e) =>
                          setFieldValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={6} xs={12} xl={4}>
                    <div>
                      <Label>Skill Set</Label>
                      <Input
                        id="skill"
                        onFocus={() => setIsfocus("skill")}
                        onBlur={() => setIsfocus(null)}
                        style={{
                          borderColor: focus === "skill" && themecolor,
                        }}
                        name="skill"
                        value={values?.skill}
                        className="w-100"
                        disabled={isDisabledAllFields}
                        maxLength={200}
                        type="textarea"
                        placeholder={"Enter skill"}
                        onChange={(e) =>
                          setFieldValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Professional;
