import React, { useEffect, useState } from "react";
import { Plus, X } from "react-feather";
import { Row, Col, Input, Label } from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useSelector } from "react-redux";
// import Repeater from '../Repeater/index'
const Basic = ({
  candidate,
  setCandidate,
  create,
  setGender,
  setEmail,
  gender,
  isDisabledAllFields = false,
  handleChange = () => {},
}) => {
  const loginUser = useSelector((state) => state.auth.user);
  const genderOptions = [
    { value: "male", id: "gender", label: "Male" },
    { value: "female", id: "gender", label: "Female" },
  ];
  useEffect(() => {
    if (candidate?.gender?.length > 0) {
      let label = "Male";
      if (candidate?.gender === "female") label = "Female";
      setGender({ value: [candidate.gender], label });
    }
  }, []);

  useEffect(() => {
    if (create) {
      setCandidate({ ...candidate, userId: loginUser.id });
    }
  }, [create]);
  const themecolor = localStorage.getItem("themecolor");
  const [focus, setIsfocus] = useState(null);
  return (
    <div>
      {/* BASIC INFO */}
      <Row className="gy-1 pt-75">
        <div>
          <h4>Basic Info</h4>
        </div>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="firstname">
              First Name<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="firstname"
              name="firstname"
              className="w-100"
              maxLength={200}
              type="text"
              onFocus={() => setIsfocus("firstname")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "firstname" && themecolor,
              }}
              disabled={isDisabledAllFields}
              placeholder={"Enter FirstName"}
              value={candidate?.firstname}
              onChange={(e) => {
                handleChange(e);
                // setFName(e.target.value)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="lastname">
              Last Name<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="lastname"
              name="lastname"
              onFocus={() => setIsfocus("lastname")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "lastname" && themecolor,
              }}
              maxLength={200}
              className="w-100"
              type="text"
              value={candidate?.lastname}
              disabled={isDisabledAllFields}
              // value={searchTerm}
              placeholder={"Enter Lastname"}
              onChange={(e) => {
                // setLName(e.target.value)
                handleChange(e);
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="email">
              Email<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="email"
              name="email"
              onFocus={() => setIsfocus("email")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "email" && themecolor,
              }}
              className="w-100"
              maxLength={200}
              type="email"
              placeholder={"Enter Email"}
              disabled={isDisabledAllFields}
              value={candidate?.email}
              onChange={(e) => {
                setEmail(e.target.value.toLowerCase());
                // handleChange(e)
                setCandidate({
                  ...candidate,
                  [e.target.id]: e.target.value.toLowerCase(),
                });
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="mail">
              Mobile<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="mobile"
              onFocus={() => setIsfocus("mobile")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "mobile" && themecolor,
              }}
              className="w-100"
              type="text"
              placeholder={"Enter Mobile"}
              maxLength="10"
              disabled={isDisabledAllFields}
              value={candidate?.mobile}
              onChange={(e) => {
                // setMobile(e.target.value)
                setCandidate({
                  ...candidate,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                });
                //  handleChange(e)
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label id="number">
              Father / Mother Contact<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="alternateMobile"
              onFocus={() => setIsfocus("alternateMobile")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "alternateMobile" && themecolor,
              }}
              className="w-100"
              placeholder={"Enter Father/Mother Mobile Number"}
              type="text"
              maxLength={"10"}
              disabled={isDisabledAllFields}
              value={candidate?.alternateMobile}
              onChange={(e) => {
                // setAlternateMobile(e.target.value)
                // handleChange(e)
                setCandidate({
                  ...candidate,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                });
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <Label for="role-select">
            Gender<span style={{ color: "red" }}>*</span>
          </Label>
          <Select
            id="gender"
            value={gender}
            placeholder="Select Gender"
            options={genderOptions}
            className="react-select"
            isDisabled={isDisabledAllFields}
            classNamePrefix="select"
            theme={selectThemeColors}
            onChange={(e) => {
              setGender(e);
              handleChange(e);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Basic;
