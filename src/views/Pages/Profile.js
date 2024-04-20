// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
  TabContent,
  TabPane,
} from "reactstrap";
import { selectThemeColors } from "@utils";

// ** Demo Components
import Tabs from "../../components/Profile/Tabs";
import Breadcrumbs from "@components/breadcrumbs";
import Profile from "../../components/Profile/Profile";
import Security from "../../components/Profile/Security";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import { useDispatch, useSelector } from "react-redux";
import roleActions from "../../redux/role/actions";
import jobCategoryActions from "../../redux/jobCategory/actions";
import industriesActions from "../../redux/industries/actions";
import authActions from "../../redux/auth/actions";
import userActions from "../../redux/user/actions";

import Select from "react-select";
import clientActions from "../../redux/client/actions";
import Loader from "../../components/Dialog/Loader";
import moment from "moment/moment";

const AccountSettings = () => {
  // ** States
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: roleActions.ROLES });
  }, []);
  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const CustomBreadcrumbItem = ({ title, color, fontWeight }) => (
    <span
      style={{
        fontFamily: "Montserrat, Helvetica, Arial, serif",
        fontWeight: fontWeight,
        color,
      }}
    >
      {title}
    </span>
  );
  return (
    <Fragment>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <h3 style={{ color: themecolor }}>
          <b>Profile</b>
        </h3>
      </div>

      {/* <Breadcrumbs
        breadCrumbTitle="Account Settings"
        breadCrumbParent="Pages"
        breadCrumbActive="Account Settings"
      /> */}
      <Row>
        <Col xs={12}>
          <Tabs
            className="mb-2"
            activeTab={activeTab}
            toggleTab={toggleTab}
            themecolor={themecolor}
          />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Profile />
            </TabPane>
            <TabPane tabId="2">
              <Security />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

const ClientProfile = () => {
  const { clients } = useSelector((state) => state.auth.user);

  const currentUser = useSelector((state) => state.auth?.user);
  const { auth } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);
  const { currentPlan } = useSelector((state) => state.subscription);
  const { loading, isSuccess } = useSelector((state) => state.client);
  const jobCategory = useSelector((state) => state.jobCategory.results);
  const industries = useSelector((state) => state.industries);
  const [client, setClient] = useState({});
  const [selectindustries, setSelectIndustries] = useState([]);
  const dispatch = useDispatch();
  const [jobCategoryOptions, setJobCategoryOptions] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [showUpgradeplan, setShowUpgradePlan] = useState(false);
  const subscriptionDate = new Date(currentUser?.subscription?.createdAt);
  subscriptionDate?.setDate(
    subscriptionDate.getDate() + currentUser?.subscription?.timeDuration
  );
  console.log("selectedJobCategory", selectedJobCategory);
  const date = new Date(currentUser?.subscription?.createdAt);
  const day = Number(currentPlan?.plan_features?.validate_days);
  // const date = new Date(currentUser.subscription.createdAt);
  // const day = Number(currentPlan?.plan_features?.validate_days);
  const expireDate = new Date(date).setDate(new Date(date).getDate() + day);
  // const expireDate = new Date(date)?.toISOString();
  // const expireDate = new Date(
  //   date.getTime() + day * 24 * 60 * 60 * 1000
  // ).toISOString();

  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );

  useEffect(() => {
    setClient(clients);
  }, [clients]);
  useEffect(() => {
    dispatch({
      type: industriesActions.GET_ALL_INDUSTRIES,
    });
    dispatch({
      type: jobCategoryActions.GET_ALL_JOBCAT,
    });
  }, []);
  useEffect(() => {
    if (clients?.industries_relation?.length > 0) {
      const selected = [];
      clients?.industries_relation?.forEach((ele) => {
        ele.label = ele?.industries?.industryCategory;
        ele.value = ele?.industries?.id;
        selected.push(ele);
      });
      setSelectIndustries(selected);
    }
    if (clients?.jobCategory_relation?.length > 0) {
      const selected = [];
      clients.jobCategory_relation?.forEach((ele) => {
        ele.label = ele?.jobCategory?.jobCategory;
        ele.value = ele?.jobCategory?.id;
        selected.push(ele);
      });
      setJobCategoryOptions(selected);
    }
  }, [clients]);

  useEffect(() => {
    if (isSuccess) {
      auth.user.clients = user?.clients;
      dispatch({
        type: authActions.UPDATE_AUTH_STATE,
        payload: auth,
      });
    }
  }, [user]);

  const onjobCategoryChange = (jobCategory) => {
    const data = [];
    jobCategory?.map((ele) => {
      if (ele.c_Id === undefined) {
        data.push(ele.value);
      } else {
        data.push(ele);
      }
    });
    setClient({ ...client, jobCategory_relation: data });
  };

  const onIndustriesChange = (industry) => {
    const data = [];
    industry?.map((ele) => {
      if (ele.c_Id === undefined) {
        data.push(ele.value);
      } else {
        data.push(ele);
      }
    });
    setClient({ ...client, industries_relation: data });
  };

  const handleSaveChanges = () => {
    delete client?.jobCategories;
    const fm = client;
    // fm.jobCategory_relation = JSON.stringify(client?.jobCategory_relation);
    // fm.industries_relation = JSON.stringify(client?.industries_relation);
    dispatch({
      type: clientActions.UPDATE_CLIENT_PROFILE,
      payload: { id: client.id, data: fm },
    });
    dispatch({
      type: userActions.GET_LOGIN_USER_DETAIL,
      payload: currentUser?.id,
    });
  };

  const handleWhatsappNotificationStatus = (data) => {
    console.log("handleWhatsappNotificationStatus data", data);
    dispatch({
      type: clientActions.WHATSAPP_NOTIFICATION_STATUS,
      payload: { id: client.id, data: data },
    });
  };
  const handleMailNotificationStatus = (data) => {
    console.log("handleMailNotificationStatus data", data);
    dispatch({
      type: clientActions.MAIL_NOTIFICATION_STATUS,
      payload: { id: client.id, data: data },
    });
  };

  //   const [focus, setIsfocus] = useState(null);
  return (
    <>
      <Loader loading={loading} />
      <Fragment>
        <Card>
          <CardHeader className="border-bottom">
            <CardTitle tag="h4">Profile Details</CardTitle>
          </CardHeader>
          <CardBody className="py-2 my-25">
            <Form className="mt-2 pt-50">
              <Row>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="firstName">
                    Company Name
                  </Label>
                  <Input
                    id="name"
                    disabled
                    placeholder="John"
                    // onChange={(e) => onChangeHandler(e.target.id, e.target.value.replace(/[^a-z ]/gi, ''))}
                    value={clients?.companyName}
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
                    value={clients?.companyowner}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="emailInput">
                    Email
                  </Label>
                  <Input
                    id="role"
                    type="text"
                    name="text"
                    disabled
                    value={clients?.email}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="emailInput">
                    Mobile
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    disabled
                    value={clients?.mobile}
                  />
                </Col>
                {/* {user?.email == "gunjan@growworkinfotech.com" ? ( */}
                <>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="emailInput">
                      Plan
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      disabled
                      value={currentPlan?.planName}
                    />
                  </Col>
                  <Col sm="6" className="mb-1">
                    <Label className="form-label" for="emailInput">
                      Validity
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      disabled
                      value={
                        currentPlan?.planName == "free"
                          ? "-"
                          : moment(expireDate).format("DD-MM-YYYY")
                      }
                    />
                  </Col>
                </>
                {/* ) : null} */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="address">
                    Industries
                  </Label>
                  <Select
                    // isDisabled={update}
                    style={{ cursor: "pointer" }}
                    id="industries"
                    name="industries"
                    value={
                      selectedIndustries?.length
                        ? selectedIndustries
                        : selectindustries
                    }
                    placeholder="Select Industries"
                    options={
                      industries?.length > 0 &&
                      industries?.filter((ele) => {
                        ele.label = ele?.industryCategory;
                        ele.value = ele?.id;
                        return ele;
                      })
                    }
                    isMulti
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setSelectIndustries(e);
                      onIndustriesChange(e);
                      setSelectedIndustries(e);
                    }}
                  />
                  {selectindustries.length < 1 ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Please Select Any Industries
                    </p>
                  ) : null}
                </Col>
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="phNumber">
                    Job Category
                  </Label>
                  <Select
                    style={{ cursor: "pointer" }}
                    id="jobCategoryId"
                    name="jobCategoryId"
                    value={
                      selectedJobCategory?.length
                        ? selectedJobCategory
                        : jobCategoryOptions
                    }
                    isMulti
                    placeholder="Select jobCategory"
                    // options={jobCategoryOptions}
                    options={
                      jobCategory?.length > 0 &&
                      jobCategory?.filter((ele) => {
                        ele.label = ele?.jobCategory;
                        ele.value = ele?.id;
                        return ele;
                      })
                    }
                    className="react-select"
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    onChange={(e) => {
                      setJobCategoryOptions(e);
                      onjobCategoryChange(e);
                      setSelectedJobCategory(e);
                      // setFieldValue("jobCategoryId", e.value)
                    }}
                  />
                  {jobCategoryOptions.length < 1 ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Please Select Any Job Category
                    </p>
                  ) : null}
                </Col>
                <Col sm="6" className="mb-1" style={{ height: "75px" }}>
                  <Label className="form-label" for="emailInput">
                    Whatsapp Notification
                  </Label>
                  <div
                    className="form-switch form-check-primary"
                    onClick={() => setShowUpgradePlan(true)}
                  >
                    <Input
                      type="switch"
                      id="switch-primary"
                      disabled={
                        currentPlan?.planName == "free" ||
                        currentPlan?.planName == "Trial"
                      }
                      //   onFocus={() => setIsfocus("switch")}
                      //   onBlur={() => setIsfocus(null)}
                      style={{
                        borderColor:
                          currentPlan?.planName != "free" &&
                          currentPlan?.planName != "Trial" &&
                          user?.clients?.whatsappNotification &&
                          themecolor,
                        backgroundColor:
                          currentPlan?.planName != "free" &&
                          currentPlan?.planName != "Trial" &&
                          user?.clients?.whatsappNotification &&
                          themecolor,
                        cursor: "pointer",
                      }}
                      checked={
                        currentPlan?.planName != "free" &&
                        currentPlan?.planName != "Trial" &&
                        user?.clients?.whatsappNotification
                      }
                      onChange={() => {
                        handleWhatsappNotificationStatus(
                          !user?.clients?.whatsappNotification
                        );
                      }}
                    />
                  </div>
                  <p style={{ fontSize: "11px", color: "red" }}>
                    {(currentPlan?.planName == "free" ||
                      currentPlan?.planName == "Trial") &&
                    showUpgradeplan
                      ? "You need to upgrade your plan to use this feature"
                      : ""}
                  </p>
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="emailInput">
                    Mail Notification
                  </Label>
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      id="switch-primary"
                      name="primary"
                      //   onFocus={() => setIsfocus("mailNotification")}
                      //   onBlur={() => setIsfocus(null)}
                      style={{
                        borderColor:
                          user?.clients?.mailNotification && themecolor,
                        backgroundColor:
                          user?.clients?.mailNotification && themecolor,
                        cursor: "pointer",
                      }}
                      checked={user?.clients?.mailNotification}
                      onChange={() => {
                        handleMailNotificationStatus(
                          !user?.clients?.mailNotification
                        );
                      }}
                    />
                  </div>
                </Col>
                <Col className="mt-2" sm="12" style={{ textAlign: "center" }}>
                  <Button
                    color="defult"
                    style={{ backgroundColor: themecolor, color: "white" }}
                    onClick={handleSaveChanges}
                    disabled={
                      jobCategoryOptions.length > 0 &&
                      selectindustries.length > 0
                        ? false
                        : true
                    }
                  >
                    Update changes
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Fragment>
    </>
  );
};

const ProfilePage = () => {
  const [page, setPage] = useState(<AccountSettings />);
  const auth = useSelector((state) => state?.auth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: userActions.GET_LOGIN_USER_DETAIL,
      payload: user?.id,
    });
  }, []);
  useEffect(() => {
    if (auth?.user?.clients) {
      if (auth?.user?.clients?.length == 0) {
        setPage(<AccountSettings />);
      } else {
        setPage(<ClientProfile />);
      }
    }
  }, [auth]);
  return page;
};

export default ProfilePage;
