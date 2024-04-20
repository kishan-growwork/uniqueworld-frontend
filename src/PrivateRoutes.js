import { Route, Redirect } from "react-router-dom";
import { persistor } from "./redux/store";
import { getAgencyDetailBySlug } from "./apis/agency";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import agencyActions from "./redux/agency/actions";

const PrivateRoute = ({ ...rest }) => {
  const token = localStorage.getItem("token");
  const params = useParams();
  const dispatch = useDispatch();
  const [agencyError, setAgencyError] = useState(false);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      if (user?.role?.name != "SuperAdmin") {
        const resp = await getAgencyDetailBySlug(params?.slug);

        if (resp?.error == "Your slug is not present in agency") {
          setAgencyError(true);
        }
        dispatch({
          type: agencyActions.SET_AGENCY_STATE,
          payload: {
            agencyDetail: resp,
          },
        });
      }
    })();
  }, []);

  if (
    token === null ||
    token === "null" ||
    token === undefined ||
    token === "undefined"
  ) {
    localStorage.clear();
    window.localStorage.removeItem("persist:root");
    persistor.pause();
    return <Redirect to="/login" />;
  }

  if (agencyError) {
    return <Redirect to="/*" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
