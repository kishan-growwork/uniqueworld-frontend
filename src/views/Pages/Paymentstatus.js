import { City, State } from "country-state-city";
import React, { useEffect, useState } from "react";
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

const paymentstatus = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
 
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
  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry("IN");
        setStates(result);
      } catch (error) {
        setStates([]);
      }
    };

    getStates();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await City.getCitiesOfState(
          "IN",
          selectedState?.isoCode
        );
        setCities(result);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="container mt-2"
      >
        <div className="card px-3">
          <div className="row">
            <div className="col-lg-7 card-body border-end">
              <h4 className="mt-2 mb-4">Billing Details</h4>
              <form>
                <div className="row g-3">
                  <Col md="12" className="mt-1">
                    <Label>State</Label>
                    <Select
                      menuPlacement="auto"
                      id="state"
                      value={selectedState}
                      placeholder={"Select State"}
                      options={states}
                      className="react-select"
                      classNamePrefix="select"
                      onChange={(e) => {
                        setSelectedState(e);
                        setSelectedCity("");
                      }}
                    />
                  </Col>
                  <Col md="12" className="mt-1">
                    <Label for="role-select">City</Label>
                    {/* <Input
                    id="city"
                    className="w-100"
                    type="text"
                    maxLength={200}
                    placeholder="Enter City"
                    value={filter.city}
                    onChange={(e) =>
                      handleFilterChange(
                        e.target.id,
                        e.target.value.replace(/[^a-z  -]/gi, "")
                      )
                    }
                  /> */}
                    <Select
                      menuPlacement="auto"
                      id="city"
                      value={selectedCity}
                      placeholder={"Select City"}
                      options={cities}
                      className="react-select"
                      classNamePrefix="select"
                      onChange={(e) => {
                        setSelectedCity(e);
                      }}
                    />
                  </Col>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="billings-zip">
                      Billing Zip / Postal Code
                    </label>
                    <input
                      type="text"
                      id="billings-zip"
                      className="form-control billings-zip-code"
                      placeholder="Zip / Postal Code"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-5 card-body">
              <h4 className="mb-2">Order Summary</h4>
              <div className="bg-lighter p-4 rounded mt-4">
                <p className="mb-1">A simple start for everyone</p>
                <div className="d-flex align-items-center">
                  <h1 className="text-heading display-5 mb-1">$59.99</h1>
                  <sub>/month</sub>
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    data-bs-target="#pricingModal"
                    data-bs-toggle="modal"
                    className="btn btn-label-primary waves-effect"
                  >
                    Change Plan
                  </button>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="mb-0">Subtotal</p>
                  <h6 className="mb-0">$85.99</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="mb-0">Tax</p>
                  <h6 className="mb-0">$4.99</h6>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mt-3 pb-1">
                  <p className="mb-0">Total</p>
                  <h6 className="mb-0">$90.98</h6>
                </div>
                <div className="d-grid mt-3">
                  <button className="btn btn-success waves-effect waves-light">
                    <span className="me-2">Proceed with Payment</span>
                    <i className="ti ti-arrow-right scaleX-n1-rtl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default paymentstatus;
