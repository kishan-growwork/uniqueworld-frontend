// ** React Imports
import { useEffect, useState } from "react";
import "cleave.js/dist/addons/cleave-phone.us";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  FormFeedback,
} from "reactstrap";
// import { useSelector } from 'react-redux'
import awsUploadAssets from "../../helper/awsUploadAssets";
import { useDispatch, useSelector } from "react-redux";
// import actions from "../../redux/auth/actions";
import fileActions from "./../../redux/fileUploadProgress.js/actions";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { updateAgency } from "../../apis/agency";
import { Flex, Progress } from "antd";
import agencyActions from "../../redux/agency/actions";
import { SketchPicker } from "react-color";
import userActions from "../../redux/user/actions";
import useBreakpoint from "../../utility/hooks/useBreakpoints";
const AgencyDetails = () => {
  // const role = useSelector(state => state.role)
  const { progress } = useSelector((state) => state);
  const userDetail = useSelector((state) => state.auth.user);
  const [profilePic, setProfilePic] = useState();
  const [user, setUser] = useState({});
  const userData = useSelector((state) => state?.user?.user?.agency);
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const onChangeHandler = (id, value) => {
    if (id === "logo") {
      setProfilePic(URL.createObjectURL(value));
    }
    setUser({ ...user, [id]: value });
  };
  const defaultValues = {
    mobileNumber: userData?.mobileNumber || "",
    phoneNumber: userData?.phoneNumber || "",
  };
  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return "";
    }
  };
  const AgencySchema = yup.object().shape({
    mobileNumber: yup
      .string()
      .required()
      .min(10, (obj) => showErrors("mobileNumber", obj.value.length, obj.min)),
    phoneNumber: yup
      .string()
      .required()
      .min(10, (obj) => showErrors("phoneNumber", obj.value.length, obj.min)),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(AgencySchema),
  });
  useEffect(() => {
    if (progress?.uploadedLink && progress?.isUploaded === true) {
      setUser({ ...user, logo: progress?.uploadedLink });
      handleSaveChangesAgency(progress?.uploadedLink);
      dispatch({
        type: fileActions.CLEAR_PROGRESS,
      });
    } else if (progress.isError === true) {
      toast.error("something went wrong try again");
      dispatch({
        type: fileActions.CLEAR_PROGRESS,
      });
    }
  }, [progress]);

  const handleCancel = () => {
    reset(defaultValues);
  };
  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const [focus, setIsfocus] = useState(null);
  const [colorHex, setColorHex] = useState("");

  useEffect(() => {
    setUser({
      ...userData,
      themecolor: colorHex,
    });
  }, [colorHex]);
  useEffect(() => {
    if (colorHex == "") {
      setColorHex(userData?.themecolor ? userData?.themecolor : "#000");
    }
    if (
      userData?.themecolor == "" ||
      userData?.themecolor == null ||
      userData?.themecolor == undefined
    ) {
      setAgency({
        ...userData,
        themecolor: userData?.themecolor
          ? userData?.themecolor
          : colorHex == "#000" || colorHex == ""
          ? "#000"
          : colorHex,
      });
    }
  }, [userData]);

  const handleSaveChangesAgency = async () => {
    localStorage.setItem("themecolor", colorHex);
    const data = Object.assign({}, user);
    const fm = new FormData();
    // const id = user?.id;
    const logo = user?.logo;
    // delete user?.password;
    // delete user.image;
    if (logo?.name) {
      await awsUploadAssets(logo, "logo", dispatch);
    } else {
      for (const key in data) {
        fm.append(key, user[key]);
      }
      fm.append("logo", logo);
      const resp = await updateAgency(data);

      if (resp && resp?.isSuccess && resp?.data?.agency?.id) {
        dispatch({
          type: userActions.GET_LOGIN_USER_DETAIL,
          payload: userDetail?.id,
        });
        dispatch({
          type: agencyActions.SET_AGENCY_STATE,
          payload: {
            agencyDetail: resp?.data?.agency,
          },
        });
      }
    }
  };
  const { width } = useBreakpoint();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const HexCase = () => {
    return (
      <>
        <div className="d-flex align-items-center gap-1">
          <div
            style={{
              width: "31px",
              padding: "3px",
              background: "#fff",
              borderRadius: "1px",
              boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => {
              setDisplayColorPicker(!displayColorPicker);
            }}
          >
            <div
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "2px",
                background: colorHex,
              }}
            />
          </div>
          {displayColorPicker ? (
            <div style={{ position: "absolute", zIndex: "2" }}>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                onClick={() => {
                  setDisplayColorPicker(false);
                }}
              />
              <SketchPicker
                color={colorHex}
                onChange={(newColor) => {
                  setColorHex(newColor.hex);
                }}
              />
            </div>
          ) : null}
          <span>HEX: {colorHex}</span>
        </div>
      </>
    );
  };
  return (
    <>
      <CardBody className="py-2 my-25">
        <div
          className="d-flex"
          style={width < 455 ? { flexDirection: "column" } : null}
        >
          <div
            className="me-25"
            style={
              width < 455
                ? {
                    maxWidth: "60%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  }
                : {
                    maxWidth: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
            }
          >
            <img
              src={profilePic ? profilePic : user?.logo}
              alt="Generic placeholder image"
              style={{
                maxHeight: "80px",
                padding: "11px",
                width: "100%",
              }}
            />
          </div>
          <div className="d-flex align-items-end mt-75 ms-1">
            <div
              style={
                width < 455
                  ? {
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }
                  : null
              }
            >
              <Button
                tag={Label}
                className="mb-75 me-75"
                size="sm"
                color="defult"
                style={
                  width < 455
                    ? {
                        backgroundColor: themecolor,
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        width: "10rem",
                      }
                    : {
                        backgroundColor: themecolor,
                        color: "white",
                      }
                }
              >
                Upload
                <Input
                  type="file"
                  id="logo"
                  onChange={(e) =>
                    onChangeHandler(e.target.id, e.target.files[0])
                  }
                  hidden
                  accept="image/*"
                />
              </Button>
              {/* <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                                    Reset
                                </Button> */}
              <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        {progress?.isUploading && (
          <div
            className="mt-2"
            style={{
              width: "100%",
            }}
          >
            <Flex gap="small" vertical>
              <Progress
                percent={progress?.percentage}
                strokeColor={themecolor}
              />
            </Flex>
            {/* <Progress value={progress?.percentage}>
              {progress?.percentage}%
            </Progress> */}
          </div>
        )}

        <Form
          className="mt-2 pt-50"
          onSubmit={handleSubmit(handleSaveChangesAgency)}
        >
          <Row>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Agency Name
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.name || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Owner Name
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.ownersName || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="address">
                Mobile Number
              </Label>
              <Controller
                control={control}
                id="mobileNumber"
                name="mobileNumber"
                render={({ field }) => (
                  <Input
                    id="mobileNumber"
                    onFocus={() => setIsfocus("mobileNumber")}
                    onBlur={() => setIsfocus(null)}
                    style={{
                      borderColor: focus === "mobileNumber" && themecolor,
                    }}
                    label="mobileNumber"
                    htmlFor="mobileNumber"
                    maxLength={10}
                    className="input-group-merge"
                    invalid={errors.mobileNumber ? true : false}
                    {...field}
                    onChange={(e) => {
                      onChangeHandler(e.target.id, e.target.value);
                      field.onChange(e);
                    }}
                  />
                )}
              />
              {errors.mobileNumber && (
                <FormFeedback className="d-block">
                  {errors.mobileNumber.message}
                </FormFeedback>
              )}
              {/* <Input
                    id="address"
                    name="address"
                    type="text"
                    maxLength={10}
                    placeholder="12, Business Park"
                    onChange={(e) =>
                      onChangeHandler(e.target.id, e.target.value)
                    }
                    value={user?.address}
                  /> */}
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="address">
                Phone Number
              </Label>
              <Controller
                control={control}
                id="phoneNumber"
                name="phoneNumber"
                render={({ field }) => (
                  <Input
                    id="phoneNumber"
                    onFocus={() => setIsfocus("phoneNumber")}
                    onBlur={() => setIsfocus(null)}
                    style={{
                      borderColor: focus === "phoneNumber" && themecolor,
                    }}
                    label="phoneNumber"
                    htmlFor="phoneNumber"
                    maxLength={10}
                    className="input-group-merge"
                    invalid={errors.phoneNumber ? true : false}
                    {...field}
                    onChange={(e) => {
                      onChangeHandler(e.target.id, e.target.value);
                      field.onChange(e);
                    }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <FormFeedback className="d-block">
                  {errors.phoneNumber.message}
                </FormFeedback>
              )}
              {/* <Input
                    id="address"
                    name="address"
                    type="text"
                    maxLength={10}
                    placeholder="12, Business Park"
                    onChange={(e) =>
                      onChangeHandler(e.target.id, e.target.value)
                    }
                    value={user?.address}
                  /> */}
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Email
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.email || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Address
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.address || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Country
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.country || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                State
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.state || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                City
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.city || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Whatsapp Number
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.whatsapp || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                GST Number
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.gstNo || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                Pancard Number
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.pancardNo || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="emailInput">
                CIN Number
              </Label>
              <Input
                id="id"
                disabled
                name="text"
                placeholder="User ID"
                value={user?.cinNumber || "-"}
              />
            </Col>
            <Col sm="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="emailInput">
                Theme Color
              </Label>
              {HexCase()}
            </Col>
            <Col className="mt-2" sm="12">
              <Button
                className="me-1"
                color="defult"
                style={{ backgroundColor: themecolor, color: "white" }}
                type="submit"
              >
                Save
              </Button>
              <Button
                color="secondary"
                outline
                type="button"
                onClick={() => handleCancel()}
              >
                Discard
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
};

export default AgencyDetails;
