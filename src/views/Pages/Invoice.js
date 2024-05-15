/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import actions from "../../redux/payment/actions";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";#
import { usePDF } from "react-to-pdf";
const Invoice = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const componentRef = useRef();

  const history = useHistory();

  const dispatch = useDispatch();
  const params = useParams();
  const details = useSelector(
    (state) => state?.payment?.paymentDetails?.response
  );
  let invoiceto = "";
  if (
    details?.Company !== null &&
    details?.Company !== "" &&
    details?.Company !== "null" &&
    details?.Company !== undefined
  ) {
    invoiceto = details?.Company;
  } else {
    invoiceto = `${
      details?.firstname && details?.firstname != null
        ? details?.firstname
        : null
    } ${
      details?.lastname && details?.lastname != null ? details?.lastname : null
    }`;
  }

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div style={{ width: "800px", height: "1100px" }} ref={targetRef}>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              color: "black",
              backgroundColor: "white",
            }}
          ></div>
          <div
            style={{
              position: "relative",
              padding: "2rem",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "3rem",
                top: "1rem",
                zIndex: "99999999999",
                textAlign: "right",
                color: "black",
              }}
              className="invoice-title"
            >
              <b>Invoice</b>
              <p
                style={{
                  marginBottom: "0",
                }}
                className="invoice-title"
              >
                Invoice no:<b> {`# ${details?.invoicenumber}`}</b>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  color: "black",
                }}
                className="invoice-date-wrapper"
              >
                <p className="invoice-date-title">Date Issued:</p>
                <p className="invoice-date">
                  {details?.createdAt?.slice(0, 10)}
                </p>
              </div>
            </div>
            <div style={{ padding: "0" }}>
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      marginTop: "0",
                      color: "black",
                    }}
                  >
                    <div>
                      <p className="mb-25 card-text mt-5"> </p>
                      <h4>From:</h4>
                      <p className="mb-25 card-text">Unique World</p>
                      <p className="mb-25 card-text">
                        335-336, Fortune High Street, <br /> Green City Road,
                        <br /> Near Madhuvan Circle, <br />
                        Adajan, Surat - 395009
                      </p>
                      <p className="mb-25 card-text">GST No: 24AMVPG6524E1Z0</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 0.25rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        marginBottom: "0.5rem",
                        color: "black",
                      }}
                    >
                      <h4>To:</h4>
                      <p className="mb-25 card-text">{invoiceto}</p>
                      {details?.gst !== "" &&
                        details?.gst !== null &&
                        details?.gst !== undefined && (
                          <p class="mb-25 card-text">GST No: {details?.gst}</p>
                        )}
                      <p className="mb-25 card-text">State: {details?.state}</p>
                      <p className="mb-25 card-text">City: {details?.city}</p>
                      <p className="mb-25 card-text">
                        Address: {details?.address}
                      </p>
                      <p className="mb-25 card-text">
                        pincode: {details?.pincode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        marginBottom: "0.5rem",
                        color: "black",
                      }}
                    >
                      <h4>Payment Details:</h4>
                      <p className="mb-25 card-text">
                        Payment state:
                        <span
                          style={{
                            color:
                              details?.servertoserverRes?.state === "COMPLETED"
                                ? "green"
                                : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {details?.servertoserverRes?.state}
                        </span>
                      </p>
                      <p className="mb-25 card-text">
                        Type:{" "}
                        {details?.servertoserverRes?.paymentInstrument?.type}
                      </p>
                      <p className="mb-25 card-text">
                        MerchantTransactionId: <br />
                        {details?.servertoserverRes?.merchantTransactionId}
                      </p>
                      <p className="mb-25 card-text">
                        TransactionId: <br />
                        {details?.servertoserverRes?.transactionId}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <table style={{ width: "100%", color: "black" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "0.75rem" }}>Plan Name</th>
                        <th style={{ padding: "0.75rem" }}>Price</th>
                        <th style={{ padding: "0.75rem" }}>Tax</th>
                        <th style={{ padding: "0.75rem" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        color: "black",
                      }}
                    >
                      <tr>
                        <td style={{ padding: "0.75rem" }}>
                          <b className="card-text fw-bold mb-25">
                            {details?.plans?.planName}
                          </b>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <span className="fw-bold">{`₹ ${details?.plans?.price}`}</span>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <span className="fw-bold">{`${details?.tax} %`}</span>
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <span className="fw-bold">{`₹ ${details?.TotalAmount}`}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  const slug = localStorage.getItem("slug");
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      await dispatch({
        type: actions.PAYMENT_STATUS,
        payload: { transactionId: params?.merchantTransactionid },
      });
    };
    fetchPaymentDetails();
  }, []);

  useEffect(() => {
    if (details) {
      toPDF({ method: "save", resolution: 1080 });
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      history.push(`/${slug}/payment/preview/${params?.merchantTransactionid}`);
    }, 5);
  }, []);

  return (
    <>
      <ComponentToPrint ref={componentRef} />
    </>
  );
};

export default Invoice;
