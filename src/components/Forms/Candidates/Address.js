import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "../../../utility/Utils";
// import { selectThemeColors } from '../../../utility/Utils'

export const Address = ({
  cities,
  states,
  selectedState,
  setSelectedState,
  setSelectedCity,
  selectedCity,
  candidate,
  setCandidate,
  isDisabledAllFields,
  handleChange = () => {},
}) => {
  useEffect(() => {
    states?.map((ele) => {
      ele.label = ele.name;
      ele.value = ele.name;
      ele.key = "state";
    });
  }, [states]);

  useEffect(() => {
    cities?.map((ele) => {
      ele.label = ele.name;
      ele.value = ele.name;
      ele.key = "city";
    });
  }, [cities]);
 const themecolor = localStorage.getItem("themecolor");
  const [focus, setIsfocus] = useState(null);

  useEffect(() => {
    if (candidate?.state && (selectedCity != undefined || selectedState != undefined)) {
    const updatedUserData = { ...candidate };
    delete updatedUserData.city;
    delete updatedUserData.cityId;
    setCandidate(updatedUserData);
    setSelectedCity(undefined)
  }
  }, [candidate?.state])
  
  return (
    <div>
      <Row className="gy-1 pt-75" style={{ marginTop: "10px" }}>
        <div>
          <h4>Address Information</h4>
        </div>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>Address</Label>
            <Input
              maxLength={230}
              id="street"
              onFocus={() => setIsfocus("street")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "street" && themecolor,
              }}
              className="w-100"
              type="text"
              placeholder={"Enter Street"}
              value={candidate?.street}
              disabled={isDisabledAllFields}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>State</Label>
            <Select
              id="state"
              // defaultInputValue={candidate?.state || ''}
              value={selectedState}
              placeholder={candidate?.state || "Select State"}
              options={states}
              className="react-select"
              isDisabled={isDisabledAllFields}
              classNamePrefix="select"
              theme={selectThemeColors}
              onChange={(e) => {
                setSelectedState(e);
                handleChange(e);
              }}
            />
          </div>
        </Col>
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>City</Label>
            {/* <Input
              id="city"
              className="w-100"
              type="text"
              placeholder={"Enter City"}
              value={candidate?.city}
              onChange={(e) => setCandidate({ ...candidate, [e.target.id]: e.target.value.replace(/[^a-z  -]/gi, '') })}
            /> */}
            <Select
              id="city"
              value={selectedCity != undefined ? selectedCity : ''}
              placeholder={candidate?.city || "Select City"}
              options={cities}
              isDisabled={isDisabledAllFields}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              onChange={(e) => {
                setSelectedCity(e);
                handleChange(e);
              }}
            />
          </div>
        </Col>
        {/* <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>State</Label>
            <Input
              id="state"
              className="w-100"
              type="text"
              placeholder={"Enter State"}
              value={candidate?.state}
              onChange={(e) => setCandidate({ ...candidate, [e.target.id]: e.target.value.replace(/[^a-z  -]/gi, '') })}
            />
          </div>
        </Col> */}
        <Col lg={6} xs={12} xl={4}>
          <div>
            <Label>Zip/Postal Code</Label>
            <Input
              id="zip"
              onFocus={() => setIsfocus("zip")}
              onBlur={() => setIsfocus(null)}
              style={{
                borderColor: focus === "zip" && themecolor,
              }}
              className="w-100"
              type="text"
              disabled={isDisabledAllFields}
              maxLength={6}
              placeholder={"Enter Zip"}
              value={candidate?.zip}
              onChange={(e) =>
                setCandidate({
                  ...candidate,
                  [e.target.id]: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
