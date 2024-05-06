// ** Third Party Components
// import classnames from 'classnames'
import {
  TrendingUp,
  User,
  Box,
  DollarSign,
  BookOpen,
  UserCheck,
  CheckCircle,
  XCircle,
  CheckSquare,
} from "react-feather";
// ** Custom Components
import Avatar from "@components/avatar";
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Input,
} from "reactstrap";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";
import { useSelector } from "react-redux";
import { useState } from "react";

const Statistics = ({ setYear, setMonth, candidate, year, month, loading }) => {
  const lastYears = ["All"];
  const max = new Date().getFullYear();
  const themecolor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const min = 2023;
  for (let i = max; i >= min; i--) {
    lastYears.push(i);
  }
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = [
    {
      title: candidate?.candidate,
      subtitle: "Candidate",
      color: "light-primary",
      icon: <User size={24} />,
    },
    {
      title: candidate?.OnBoarding,
      subtitle: "On Boarding",
      color: "light-info",
      icon: <BookOpen size={24} />,
    },
    {
      title: candidate?.scheduled,
      subtitle: "Interview Scheduled",
      color: "light-warning",
      icon: <UserCheck size={24} />,
    },
    {
      title: candidate?.hired,
      subtitle: "Hired",
      color: "light-success",
      icon: <CheckCircle size={24} />,
    },
    {
      title: candidate?.rejected,
      subtitle: "Rejected",
      color: "light-danger",
      icon: <XCircle size={24} />,
    },
    {
      title: candidate?.completed,
      subtitle: "Completed",
      color: "light-success",
      icon: <CheckSquare size={24} />,
    },
  ];
  const renderData = () => {
    return data.map((item) => {
      return (
        <Col
          lg={6}
          xs={6}
          xl={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          className="mb-5"
        >
          <Avatar color={item.color} icon={item.icon} className="me-2" />
          <div className="my-auto">
            <h4 className="fw-bolder mb-0">{item.title}</h4>
            <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
          </div>
        </Col>
      );
    });
  };
  const [focus, setIsfocus] = useState(null);
  return (
    <Card
      className="card-statistics"
      style={{ height: "500px", padding: "1.5rem 1.5rem" }}
    >
      <div style={{ margin: "10px 0px" }}>
        <CardTitle tag="h4">Statistics</CardTitle>
      </div>
      <Row className="d-flex align-items-center mb-3">
        <Col lg={6} xs={6} xl={6}>
          <label
            htmlFor="rows-per-page"
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            Year
          </label>
          <Input
            type="select"
            id="year-input"
            disabled={loading}
            value={year ? year : "Year Filter"}
            onFocus={() => setIsfocus("year")}
            onBlur={() => setIsfocus(null)}
            style={{
              cursor: "pointer",
              borderColor: focus === "year" && themecolor,
            }}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            {lastYears?.map((item) => {
              return <option value={item == "All" ? 0 : item}>{item}</option>;
            })}
          </Input>
        </Col>
        <Col lg={6} xs={6} xl={6}>
          <label
            htmlFor="rows-per-page"
            style={{ marginLeft: "10px", marginBottom: "10px" }}
          >
            Month
          </label>
          <Input
            className="mx-50"
            type="select"
            disabled={loading}
            id="rows-per-page"
            value={month ? month : "Month Filter"}
            onFocus={() => setIsfocus("month")}
            onBlur={() => setIsfocus(null)}
            style={{
              cursor: "pointer",
              borderColor: focus === "month" && themecolor,
            }}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            {months?.map((item, i) => {
              return <option value={i}>{item}</option>;
            })}
          </Input>
        </Col>
      </Row>
      {loading == true ? (
        <ComponentSpinner isClientCandidate={true} theamcolour={themecolor} />
      ) : (
        <>
          {" "}
          <Row className="d-flex align-items-center">{renderData()}</Row>
        </>
      )}
    </Card>
  );
};
export default Statistics;
