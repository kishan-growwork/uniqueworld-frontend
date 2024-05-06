import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Basic from "../Forms/Candidates/Basic";
import { Address } from "../Forms/Candidates/Address";
import Professional from "../Forms/Candidates/Professional";
// import Education from '../Forms/Candidates/Education'
// import Experience from '../Forms/Candidates/Experience'
import Attachment_File from "../Forms/Candidates/Attachment_File";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Candidate = ({
  CandidateHandler = () => {},
  candidate,
  setIndustriesData,
  update,
  // candidateId,
  industriesData,
  setEmail,
  create,
  setCandidate,
  // setFilterData,
  setCreate,
  setUpdate,
  show,
  setGender,
  gender,
  setShow,
  isDisabledAllFields,
  setIsDisabledAllFields,
  loading,
}) => {
  // const { user } = useSelector((state) => state.auth);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();

  // if (user.email !== "uniqueworldjobs@gmail.com") {
  //   if (candidate.agencyId != user.agencyId) {
  //     setIsDisabledAllFields(true);
  //   } else {
  //     setIsDisabledAllFields(false);
  //   }
  // } else {
  //   setIsDisabledAllFields(false);
  // }
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
          update == true
            ? selectedState == undefined
              ? candidate?.stateId
              : selectedState?.isoCode
            : selectedState?.isoCode
        );
        setCities(result);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);

  const handleChange = (e) => {
    if (e?.key == "state") {
      setCandidate({ ...candidate, state: e.value, stateId: e.isoCode });
    } else if (e?.key == "city") {
      setCandidate({ ...candidate, city: e.value, cityId: e.value });
    } else {
      if (e?.target?.id === undefined) {
        setCandidate({ ...candidate, [e.id]: e.value });
      } else {
        if (e.target.id === "street")
          setCandidate({ ...candidate, [e.target.id]: e.target.value });
        else
          setCandidate({
            ...candidate,
            [e.target.id]: e.target.value.replace(/[^a-z]/gi, ""),
          });
      }
    }
  };

  const fileOnChangeHandler = (e) => {
    setCandidate({
      ...candidate,
      [e.target.id]: e.target.files[0],
    });
  };
  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const [focus, setIsfocus] = useState(null);
  // const [isdashboard, setisdashboard] = useState(false);

  function pushfunction() {
    // history.push(`/${user?.agency?.slug}/dashboard`);
  }
  return (
    <>
      <Modal
        isOpen={show}
        toggle={() => {
          setShow(show);
        }}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader
          className="bg-transparent"
          // onClick={() => onClickHandler()}
          toggle={() => {
            // setFilterData([])
            setIsDisabledAllFields(false);
            setShow(!show);
            setUpdate(false);
            setCreate(false);
            pushfunction();
          }}
        ></ModalHeader>

        {loading == true ? (
          <Loader loading={loading} theamcolour={themecolor} />
        ) : null}
        <ModalBody className="px-sm-5 pt-50 pb-5">
          {/* Bassic Info */}
          <Basic
            candidate={candidate}
            setCandidate={setCandidate}
            create={create}
            handleChange={handleChange}
            setEmail={setEmail}
            setGender={setGender}
            gender={gender}
            isDisabledAllFields={isDisabledAllFields}
          />

          {/* ADDRESS INFORMATION */}
          <Address
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            states={states}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setCandidate={setCandidate}
            candidate={candidate}
            handleChange={handleChange}
            isDisabledAllFields={isDisabledAllFields}
          />

          {/* PROFESSIONAL DETAILS */}
          <Professional
            industriesData={industriesData}
            setIndustriesData={setIndustriesData}
            update={update}
            candidate={candidate}
            setCandidate={setCandidate}
            isDisabledAllFields={isDisabledAllFields}
          />

          {/* EDUCATIONAL DETAILS */}
          {/* <Education
            setCandidate={setCandidate}
            update={update}
            candidate={candidate}
          />

          <Experience
            setCandidate={setCandidate}
            update={update}
            candidate={candidate}
          /> */}

          {/* ATTACHMENT INFORMATION */}
          <Attachment_File
            fileOnChangeHandler={fileOnChangeHandler}
            candidate={candidate}
            update={update}
            isDisabledAllFields={isDisabledAllFields}
          />
          <Row className="gy-1 pt-75" style={{ marginTop: "10px" }}>
            <Col lg={12} xs={12} xl={12}>
              <Label id="Comments">Comments</Label>
              <Input
                type="textarea"
                name="comments"
                onFocus={() => setIsfocus("comments")}
                onBlur={() => setIsfocus(null)}
                style={{
                  borderColor: focus === "comments" && themecolor,
                }}
                id="comments"
                rows="3"
                maxLength={250}
                disabled={isDisabledAllFields}
                value={candidate?.comments}
                placeholder="Enter Comments"
                onChange={(e) => {
                  setCandidate({
                    ...candidate,
                    [e.target.id]: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
          {/* <Input
            id="comments"
            name="comments"
            className="w-100"
            type="text"
            placeholder={'Enter Comments'}
            value={candidate?.firstname}
            onChange={(e) => {
              handleChange(e)
              setFName(e.target.value)
            }
            }
          /> */}

          {/* SUBMIT BUTTON */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Button
              type="button"
              className="add-new-user"
              style={
                isDisabledAllFields == true
                  ? {
                      opacity: "0.6",
                      cursor: "not-allowed",
                      pointerEvents: "none",
                      backgroundColor: themecolor,
                      color: "white",
                    }
                  : { backgroundColor: themecolor, color: "white" }
              }
              color="default"
              onClick={(e) => {
                CandidateHandler(e);
              }}
            >
              Submit
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* <Modal
        className="modal-dialog-centered modal-xl modal-loader"

        isOpen={modalLoader} >
        <ModalBody>


          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ComponentSpinner />
          </div>

        </ModalBody>
      </Modal> */}
    </>
  );
};

export default Candidate;
