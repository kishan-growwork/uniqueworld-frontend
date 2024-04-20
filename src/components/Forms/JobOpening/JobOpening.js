import React, { useEffect, useState } from "react";
import { Plus, X } from "react-feather";
import { Row, Col, Input, Label } from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useSelector } from "react-redux";
import course from "../Course";

const JobOpening = ({
  jobOpening,
  update,
  setJobOpening,
  isRecruiter,
  handleChange = () => {},
}) => {
  const jobCategories = useSelector((state) => state.jobCategory.results);
  const industries = useSelector((state) => state.industries);
  const [selectindustries, setSelectIndustries] = useState([]);
  const [am, setAm] = useState();
  const [field, setField] = useState();
  const [subCourse, setSubCourse] = useState();
  const [pm, setPm] = useState();
  const [gender, setGender] = useState();
  const [qua, setQua] = useState();
  const [work, setWork] = useState();
  const [salaryRange, setSalaryRange] = useState("");
  const [jobCategory, setjobCategory] = useState();
  const [jobCategoryOptions, setJobCategoryOptions] = useState();
  const [sunday, setSunday] = useState();
  const [experienceInYear, setExperienceInYear] = useState([]);
  const [negotiable, setNegotiable] = useState();

  useEffect(() => {
    if (jobOpening?.gender?.length > 0) {
      let label = "Male";
      if (jobOpening?.gender === "female") label = "Female";
      setGender({ value: [jobOpening.gender], label });
    }
    if (jobOpening?.work?.length > 0) {
      let label = "inhouse";
      if (jobOpening?.work === "field") label = "Field";
      setWork({ value: [jobOpening.work], label });
    }
    if (jobOpening?.qualification?.length > 0) {
      let label = "graduation";
      const value = jobOpening?.qualification;
      if (value === "post graduate") label = "Post Graduate";
      if (value === "under graduate") label = "Under Graduate";
      setQua({ value, label, id: "qualification" });
    }
    if (jobOpening?.sunday?.length > 0) {
      let label = "On";
      if (jobOpening?.sunday === "off") label = "Off";
      setSunday({ value: [jobOpening.sunday], label });
    }
    if (jobOpening?.workType !== undefined) {
      let label = "Inhouse";
      if (jobOpening?.workType === "field") label = "Field";
      setWork({ value: [jobOpening?.workType], label });
    }
    if (jobOpening?.negotiable?.length > 0) {
      let label = "Yes";
      if (jobOpening?.negotiable === "no") label = "No";
      setNegotiable({ value: [jobOpening.negotiable], label });
    }
    if (
      jobOpening?.salaryRangeStart != null &&
      jobOpening?.salaryRangeStart != undefined &&
      jobOpening?.salaryRangeStart != 0 &&
      jobOpening?.salaryRangeEnd != null &&
      jobOpening?.salaryRangeEnd != undefined &&
      jobOpening?.salaryRangeEnd != 0
    ) {
      setSalaryRange({
        value: `${jobOpening?.salaryRangeStart} to ${jobOpening?.salaryRangeEnd}`,
        label: `${jobOpening?.salaryRangeStart} to ${jobOpening?.salaryRangeEnd}`,
      });
    }
    if (jobOpening?.jobCategory?.jobCategory !== undefined) {
      setjobCategory({ label: jobOpening?.jobCategory?.jobCategory });
    }
    if (jobOpening?.minExperienceYears !== undefined) {
      setExperienceInYear({ label: jobOpening?.minExperienceYears });
    }
    if (jobOpening?.field?.length > 0) {
      course.filter((ele) => {
        if (ele.name === jobOpening?.field) {
          setField({ value: ele.sub, label: ele.name });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (jobOpening?.industries?.industryCategory) {
      setSelectIndustries({
        label: jobOpening?.industries?.industryCategory,
        value: jobOpening?.industries?.id,
      });
    }
  }, [jobOpening]);

  useEffect(() => {
    if (am !== undefined) {
      setJobOpening({ ...jobOpening, jobStartTime: am });
    }
    if (pm !== undefined) {
      setJobOpening({ ...jobOpening, jobEndTime: pm });
    }
  }, [am, pm]);
  useEffect(() => {
    if (update === true && jobOpening?.field?.length > 0) {
      if (
        subCourse?.field === jobOpening?.field ||
        subCourse?.field === undefined
      ) {
        setSubCourse({
          label: jobOpening?.course,
          field: field?.label,
          value: jobOpening?.course,
        });
      } else {
        setSubCourse(null);
      }
    } else {
      setSubCourse(null);
    }
    if (field?.value?.length === 0) {
      setJobOpening({ ...jobOpening, course: "Please Select" });
    }
  }, [field]);

  const genderOptions = [
    { value: "male", id: "gender", label: "Male" },
    { value: "female", id: "gender", label: "Female" },
    { value: "both", id: "gender", label: "Both" },
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
  const sundayOptions = [
    { value: "on", id: "sunday", label: "On" },
    { value: "off", id: "sunday", label: "Off" },
  ];
  const experienceOptions = [
    { value: "0-1 year", id: "minExperienceYears", label: "0-1 Year" },
    { value: "1-3 year", id: "minExperienceYears", label: "1-3 Year" },
    { value: "3-5 year", id: "minExperienceYears", label: "3-5 Year" },
    { value: "5 year above", id: "minExperienceYears", label: "5 Year Above" },
  ];
  const negotiableOptions = [
    { value: "yes", id: "negotiable", label: "Yes" },
    { value: "no", id: "negotiable", label: "No" },
  ];
  const salaryRangeOptions = [
    {
      value: "10000 to 25000",
      id: "salaryRange",
      label: "10000 to 25000",
      start: "10000",
      end: "25000",
    },
    {
      value: "25000 to 50000",
      id: "salaryRange",
      label: "25000 to 50000",
      start: "25000",
      end: "50000",
    },
    {
      value: "50000 to 75000",
      id: "salaryRange",
      label: "50000 to 75000",
      start: "50000",
      end: "75000",
    },
    {
      value: "75000 to 100000",
      id: "salaryRange",
      label: "75000 to 100000",
      start: "75000",
      end: "100000",
    },
  ];

  useEffect(() => {
    if (jobCategories?.length > 0) {
      jobCategories.filter((item) => {
        item.label = item.jobCategory;
        return item;
      });
      setJobCategoryOptions(jobCategories);
    }
  }, [jobCategories]);
  const [focus, setIsfocus] = useState(null);
  const themecolor = localStorage.getItem("themecolor");
  return (
    <>
      <Row className="gy-1 pt-75 mt-75">
        <div>
          <h4>Job Description</h4>
        </div>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>Industries </Label>
            <Select
              style={{ cursor: "pointer" }}
              id="industries"
              name="industries"
              value={selectindustries}
              placeholder="Select Industries"
              options={
                industries?.length > 0 &&
                industries?.filter((ele) => {
                  ele.label = ele?.industryCategory;
                  ele.value = ele?.id;
                  return ele;
                })
              }
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              onChange={(e) => {
                setSelectIndustries(e);
                if (jobOpening?.industries?.industryCategory) {
                  delete jobOpening?.industries;
                }
                setJobOpening({ ...jobOpening, industriesId: e.value });
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="jobCategoryId">jobCategory</Label>
            <Select
              isDisabled={isRecruiter}
              id="jobCategoryId"
              value={jobCategory}
              placeholder="Select jobCategory"
              options={jobCategoryOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              onChange={(e) => {
                setjobCategory(e);
                setJobOpening({ ...jobOpening, jobCategoryId: e.id });
                // setjobCategoryValidation(e)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="numberOfVacancy">
              No. of Vacancy<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              disabled={isRecruiter}
              id="numberOfVacancy"
              name="numberOfVacancy"
              onFocus={() => setIsfocus("numberOfVacancy")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "numberOfVacancy" && themecolor,
              }}
              className="w-100"
              type="text"
              maxLength={6}
              value={jobOpening?.numberOfVacancy}
              placeholder={"Enter number of vacancy"}
              onChange={(e) => {
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                });
                // handleChange(e)
                // setNumberOfVacancyValidation(e.target.value)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="noOfVacancy">
              Job Time Start <span style={{ color: "red" }}>*</span>
            </Label>
            {/* <Flatpickr
                            disabled={isRecruiter}
                            value={jobOpening?.jobStartTime ? jobOpening?.jobStartTime : am}
                            data-enable-time
                            id='date-time-picker'
                            className='form-control'
                            onChange={date => {
                                setAm(date[0])
                                setJobTimeStartValidation(date[0])
                            }
                            }
                        /> */}
            <Flatpickr
              disabled={isRecruiter}
              className="form-control"
              value={
                jobOpening?.jobStartTime
                  ? new Date(jobOpening?.jobStartTime)
                  : am
              }
              id="timepicker"
              onFocus={() => setIsfocus("jobStartTime")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "jobStartTime" && themecolor,
              }}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "h:i:K",
                // time_24hr: true
              }}
              onChange={(date) => {
                setAm(date[0]);

                // setJobTimeStartValidation(date[0])
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="noOfVacancy">
              Job Time End <span style={{ color: "red" }}>*</span>
            </Label>
            {/* <Flatpickr
                            disabled={isRecruiter}
                            value={jobOpening?.jobEndTime ? jobOpening?.jobEndTime : pm}
                            data-enable-time
                            id='date-time-picker'
                            className='form-control'
                            onChange={date => {
                                setPm(date[0])
                                setJobTimeEndValidation(date[0])
                            }
                            }
                        /> */}
            <Flatpickr
              disabled={isRecruiter}
              className="form-control"
              value={
                jobOpening?.jobEndTime ? new Date(jobOpening?.jobEndTime) : pm
              }
              id="timepicker"
              onFocus={() => setIsfocus("jobEndTime")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "jobEndTime" && themecolor,
              }}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "h:i:K",
                // time_24hr: true
              }}
              onChange={(date) => {
                setPm(date[0]);
                // setJobTimeEndValidation(date[0])
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label for="role-select">Sunday</Label>
          <Select
            isDisabled={isRecruiter}
            id="sunday"
            value={sunday}
            placeholder="Select Sunday"
            options={sundayOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setSunday(e);
              handleChange(e);
              // setSundayValidation(e)
            }}
          />
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="experience">
              Min. Experience (In Years)
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Select
              isDisabled={isRecruiter}
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
                handleChange(e);
                // setExperienceValidation(e)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label for="role-select">
            Gender<span style={{ color: "red" }}>*</span>
          </Label>
          <Select
            isDisabled={isRecruiter}
            id="gender"
            value={gender}
            placeholder="Select Gender"
            options={genderOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setGender(e);
              handleChange(e);
              // setGenderValidation(e)
            }}
          />
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label for="workType">
            Work<span style={{ color: "red" }}>*</span>
          </Label>
          <Select
            isDisabled={isRecruiter}
            id="workType"
            value={work}
            placeholder="Select work"
            options={workOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setWork(e);
              handleChange(e);
              // setWorkValidation(e)
            }}
          />
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label id="qualification">
            Qualification<span style={{ color: "red" }}>*</span>
          </Label>
          <Select
            isDisabled={isRecruiter}
            id="qualification"
            value={qua}
            placeholder="Select qualification"
            options={qualification}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setQua(e);
              handleChange(e);
              // setQualificationValidation(e)
            }}
          />
        </Col>

        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>Education</Label>
            <Select
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
                //   setFieldValue(e.id, e.label)
                setJobOpening({ ...jobOpening, field: e.label });
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
                handleChange(e);
                //   setFieldValue(e.id, e.value)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="designation">Designation</Label>
            <Input
              disabled={isRecruiter}
              id="designation"
              onFocus={() => setIsfocus("designation")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "designation" && themecolor,
              }}
              name="designation"
              className="w-100"
              type="text"
              maxLength={200}
              value={jobOpening?.designation}
              placeholder={"Enter Designation"}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label id="salaryRangeStart">
            Salary Range<span style={{ color: "red" }}>*</span>
          </Label>
          <Select
            id="negotiable"
            value={salaryRange}
            placeholder="Select Salary Range"
            options={salaryRangeOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setJobOpening({
                ...jobOpening,
                salaryRangeStart: e?.start,
                salaryRangeEnd: e?.end,
              });
              setSalaryRange(e);
            }}
          />
          {/* <Input
              disabled={isRecruiter}
              id="salaryRangeStart"
              name="salaryRangeStart"
              onFocus={() => setIsfocus("salaryRangeStart")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "salaryRangeStart" && themecolor,
              }}
              type="text"
              maxLength={9}
              value={
                jobOpening?.salaryRangeStart
                  ? jobOpening?.salaryRangeStart
                  : salaryStart
              }
              placeholder={"Enter salary"}
              onChange={(e) => {
                setSalaryStart(e.target.value.replace(/\D/g, ""));
                // setSalaryRangeStartValidation(e.target.value)
              }}
            /> */}
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label for="role-select">
            Negotiable<span style={{ color: "red" }}>*</span>
          </Label>
          <Select
            isDisabled={isRecruiter}
            id="negotiable"
            value={negotiable}
            placeholder="Select Negotiable"
            options={negotiableOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setNegotiable(e);
              handleChange(e);
              // setNegotiableValidation(e)
            }}
          />
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="jobLocation">
              Job Location (Full Address)
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              disabled={isRecruiter}
              id="jobLocation"
              name="jobLocation"
              onFocus={() => setIsfocus("jobLocation")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "jobLocation" && themecolor,
              }}
              className="w-100"
              type="text"
              maxLength={200}
              placeholder={"Enter jobLocation"}
              value={jobOpening?.jobLocation}
              onChange={(e) => {
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value,
                });
                // setJobLocationValidation(e.target.value)
                // handleChange(e)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="basicSkill">
              Basic Skills Required<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              disabled={isRecruiter}
              id="basicSkill"
              name="basicSkill"
              onFocus={() => setIsfocus("basicSkill")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "basicSkill" && themecolor,
              }}
              className="w-100"
              type="text"
              maxLength={500}
              placeholder={"Enter Basic Skill"}
              value={jobOpening?.basicSkill}
              onChange={(e) => {
                // setBasicSkillValidation(e.target.value)
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value,
                });
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="keyRole">
              Key Role and Responsibilities
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="keyRole"
              onFocus={() => setIsfocus("keyRole")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "keyRole" && themecolor,
              }}
              disabled={isRecruiter}
              name="keyRole"
              maxLength={500}
              className="w-100"
              type="textarea"
              placeholder={"Enter Key Role and Responsibilities"}
              value={jobOpening?.keyRole}
              onChange={(e) => {
                // setKeyRoleValidation(e.target.value)
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value,
                });
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className="gy-1 pt-75 mt-75">
        <div>
          <h4>If Any Benefits From Company For Employees </h4>
        </div>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="workingDays">Working Days</Label>
            <Input
              disabled={isRecruiter}
              id="workingDays"
              onFocus={() => setIsfocus("workingDays")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "workingDays" && themecolor,
              }}
              name="workingDays"
              className="w-100"
              type="text"
              maxLength={7}
              placeholder={"Enter working days"}
              value={jobOpening?.workingDays}
              onChange={(e) =>
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="PL_SL_CL">PL/SL/CL (Paid/Sick/Casual leave)</Label>
            <Input
              disabled={isRecruiter}
              id="PL_SL_CL"
              name="PL_SL_CL"
              onFocus={() => setIsfocus("PL_SL_CL")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "PL_SL_CL" && themecolor,
              }}
              className="w-100"
              type="text"
              maxLength={7}
              placeholder={"Enter leave"}
              value={jobOpening?.PL_SL_CL}
              onChange={(e) =>
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="healthPolicy">Health Policy</Label>
            <Input
              disabled={isRecruiter}
              id="healthPolicy"
              name="healthPolicy"
              onFocus={() => setIsfocus("healthPolicy")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "healthPolicy" && themecolor,
              }}
              className="w-100"
              type="text"
              maxLength={200}
              placeholder={"Enter healthPolicy"}
              value={jobOpening?.healthPolicy}
              onChange={(e) =>
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="pf_esic">PF/ESIC</Label>
            <Input
              disabled={isRecruiter}
              id="pf_esic"
              onFocus={() => setIsfocus("pf_esic")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "pf_esic" && themecolor,
              }}
              name="pf_esic"
              className="w-100"
              maxLength={7}
              placeholder={"Enter PF/ESIC"}
              value={jobOpening?.pf_esic}
              onChange={(e) =>
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="other">Other</Label>
            <Input
              disabled={isRecruiter}
              id="other"
              name="other"
              onFocus={() => setIsfocus("other")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "other" && themecolor,
              }}
              className="w-100"
              type="text"
              maxLength={250}
              placeholder={"other"}
              value={jobOpening?.other}
              onChange={(e) =>
                setJobOpening({
                  ...jobOpening,
                  [e.target.id]: e.target.value,
                })
              }
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default JobOpening;
