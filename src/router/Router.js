import { Suspense, lazy, Fragment, useEffect } from "react";
import { useLayout } from "@hooks/useLayout";
import { useRouterTransition } from "@hooks/useRouterTransition";
import LayoutWrapper from "@layouts/components/layout-wrapper";
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Routes } from "./routes";
// import { TeamLeader } from './routes/teamLeader'
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
// import { useSelector } from 'react-redux'
import PrivateRoute from "../PrivateRoutes";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/auth/actions";
import PublicCandidate from "../views/Pages/PublicCandidate";
import PublicClient from "../views/Pages/PublicClient";
import { check_token } from "../apis/auth";
import LandingPage from "../views/Pages/LandingPage/LandingPage";
import Policy from "../views/Pages/FooterPolicy/Policy";
import Error from "../views/Error";
import CancellationAndRefund from "../views/Pages/FooterPolicy/CancellationAndRefund";
import ContactUs from "../views/Pages/FooterPolicy/ContactUs";
import TermsAndCondition from "../views/Pages/FooterPolicy/TermsAndCondition";
import ShippingAndDelivery from "../views/Pages/FooterPolicy/ShippingAndDelivery";
import { Button, Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { persistor } from "../redux/store";
import Login from "../views/Pages/Login";
import Pricing from "../views/Pages/LandingPage/Pricing/Pricing";
import ClientRegistration from "../views/Pages/ClientRegistration";

const Router = () => {
  const { layout, setLayout, setLastLayout } = useLayout();
  const { transition, setTransition } = useRouterTransition();
  const { user, isExpire } = useSelector((state) => state.auth);

  const DefaultLayout =
    layout === "horizontal" ? "HorizontalLayout" : "VerticalLayout";

  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout };

  const currentActiveItem = null;

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (token) {
        const check_token_timeOut = await check_token(token);

        if (check_token_timeOut.expired != false) {
          localStorage.clear();
          window.localStorage.removeItem("persist:root");
          persistor.pause();
        }
      }
    }
    fetchData();
  }, [user]);

  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];
    if (Routes) {
      Routes.filter((route) => {
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          if (isExpire == true) {
            if (
              user?.role?.name == "Client" &&
              route?.path?.includes("/:slug/pricing")
            ) {
              LayoutRoutes.push(route);
              LayoutPaths.push(route.path);
            }
          } else {
            if (user !== null) {
              if (route.permission.includes(user?.role?.name) === true) {
                LayoutRoutes.push(route);
                LayoutPaths.push(route.path);
              }
            } else {
              LayoutRoutes.push(route);
              LayoutPaths.push(route.path);
            }
          }
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  const NotAuthorized = lazy(() => import("@src/views/NotAuthorized"));

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const LayoutTag = Layouts[layout];

      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

      const routerProps = {};

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            routerProps={routerProps}
            setLastLayout={setLastLayout}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes?.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });

                      return (
                        <Fragment>
                          {route.layout === "BlankLayout" ? (
                            <Fragment>
                              <route.component {...props} />
                            </Fragment>
                          ) : (
                            <LayoutWrapper
                              layout={DefaultLayout}
                              transition={transition}
                              setTransition={setTransition}
                              /* Conditional props */
                              /*eslint-disable */
                              {...(route.appLayout
                                ? {
                                    appLayout: route.appLayout,
                                  }
                                : {})}
                              {...(route.meta
                                ? {
                                    routeMeta: route.meta,
                                  }
                                : {})}
                              {...(route.className
                                ? {
                                    wrapperClass: route.className,
                                  }
                                : {})}
                              /*eslint-enable */
                            >
                              {/* <Suspense fallback={null}> */}
                              <PrivateRoute
                                component={route.component}
                                {...props}
                              />
                              {/* </Suspense> */}
                            </LayoutWrapper>
                          )}
                        </Fragment>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (token && user) {
        dispatch({
          type: actions.SET_STATE,
          payload: {
            user,
            token,
          },
        });
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <AppRouter basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => {
              return <LandingPage />;
            }}
          />
          <Route
            path="/:slug/candidate/apply"
            exact
            render={() => {
              return <PublicCandidate />;
            }}
          />

          <Route
            path="/login"
            exact
            render={() => {
              return <Login />;
            }}
          />
          <Route
            path={"/:slug/client-registration"}
            exact
            render={() => <PublicClient />}
          />
          <Route
            path={"/client-registration"}
            exact
            render={() => <ClientRegistration />}
          />
          <Route path={"/policy"} exact render={() => <Policy />} />
          <Route
            path={"/refund"}
            exact
            render={() => <CancellationAndRefund />}
          />
          <Route path={"/contact_us"} exact render={() => <ContactUs />} />
          <Route path={"/plan-pricing"} exact render={() => <Pricing />} />
          <Route
            path={"/shipping"}
            exact
            render={() => <ShippingAndDelivery />}
          />
          <Route path={"/terms"} exact render={() => <TermsAndCondition />} />
          {/* <Route
          exact
          path={"/"}
          render={() => {
            return <Redirect to={user?.clients?.id ? "/candidate" : "/dashboard"} />
          }}
        /> */}

          {user?.clients?.id && (
            <Route
              exact
              path={"/dashboard"}
              render={() => {
                return <Redirect to={"/candidate"} />;
              }}
            />
          )}
          <Route
            exact
            path="/misc/not-authorized"
            render={() => (
              <Layouts.BlankLayout>
                <NotAuthorized />
              </Layouts.BlankLayout>
            )}
          />
          {ResolveRoutes()}
          <Route
            path="*"
            exact
            render={() => {
              return <Error />;
            }}
          />
        </Switch>
      </AppRouter>
    </>
  );
};

export default Router;
