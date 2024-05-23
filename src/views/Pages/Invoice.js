/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import actions from "../../redux/payment/actions";
import { usePDF, Resolution } from "react-to-pdf";
import moment from "moment/moment";
import converter from "number-to-words";

const Invoice = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const componentRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const details = useSelector(
    (state) => state?.payment?.paymentDetails?.response
  );

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
      toPDF({
        method: "save",
        resolution: Resolution.HIGH,
        page: {
          format: "letter",
        },
      });
    }
  }, [details]);

  useEffect(() => {
    const slug = localStorage.getItem("slug");
    setTimeout(() => {
      history.push(`/${slug}/payment/preview/${params?.merchantTransactionid}`);
    }, 50);
  }, []);

  const fromdate = moment(details?.createdAt).format("DD-MM-YYYY");
  const todate = moment(details?.createdAt)
    .add(details?.plans?.planFeature?.validate_days, "days")
    .format("DD-MM-YYYY");

  let invoiceto = "";
  let clientAddress = `${details?.address}, ${details?.city}, ${details?.state}`;
  if (
    details?.Company !== null &&
    details?.Company !== "" &&
    details?.Company !== "null" &&
    details?.Company !== undefined
  ) {
    invoiceto = details?.Company;
  } else {
    invoiceto = `${
      details?.firstname && details?.firstname !== null
        ? details?.firstname
        : ""
    } ${
      details?.lastname && details?.lastname !== null ? details?.lastname : ""
    }`;
  }
  let withoutTax = Math.round(details?.plans?.price * (details?.tax / 100));

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div
          style={{
            width: "800px",
            height: "1100px",
            margin: "2rem auto",
            padding: "2rem",
            border: "1px solid #ddd",
            backgroundColor: "#fff",
            color: "#000",
          }}
          ref={targetRef}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2>Uniqueworld</h2>
              <p>
                335-336, Fortune High Street,
                <br /> Green City Road,
                <br /> Near Madhuvan Circle Adajan, Surat - 395009 <br />
                GST No.: 24AMVPG6524E1Z0 <br />
                Email: corporatecare@timesinternet.in
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1 style={{ fontWeight: "bolder" }}>Invoice</h1>
              {/* <p>Original for Buyer</p> */}
            </div>
          </div>
          <hr style={{ border: "1px solid #000" }} />
          <div style={{ marginBottom: "2rem" }}>
            <h3>Addressed To :</h3>
            <p>
              {invoiceto} <br />
              {clientAddress} <br />
              {details?.gst && <p>GST No: {details?.gst}</p>}
            </p>
          </div>
          <hr style={{ border: "1px solid #000" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p>
                <strong>Invoice No. :</strong> {details?.invoicenumber}
              </p>
              <p>
                <strong>Invoice Date:</strong>{" "}
                {details?.createdAt?.slice(0, 10)}
              </p>
            </div>
            <div>
              <p>
                Payment state :{" "}
                {
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
                }
              </p>
              <p>Type: {details?.servertoserverRes?.paymentInstrument?.type}</p>
              <p>
                MerchantTransactionId:
                <br />
                {details?.servertoserverRes?.merchantTransactionId}
              </p>
              <p>
                TransactionId: <br />
                {details?.servertoserverRes?.transactionId}
              </p>
            </div>
          </div>
          <hr style={{ border: "1px solid #000" }} />
          <div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "2rem",
              }}
            >
              <thead>
                <tr>
                  <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    HSN Code
                  </th>
                  <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    Description
                  </th>
                  <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    Rate
                  </th>
                  <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    GST({`${details?.tax}%`})
                  </th>
                  <th style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    000001
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {`₹ ${details?.plans?.price}`}
                    <br />
                    {`${fromdate} to ${todate}`}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {`₹ ${details?.plans?.price}`}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {`₹ ${withoutTax}`}
                  </td>
                  <td style={{ border: "1px solid #000", padding: "0.5rem" }}>
                    {`₹ ${details?.TotalAmount}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr style={{ border: "1px solid #000" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div style={{ width: "50%" }}>
              <p>
                <strong>Sub total:</strong> ₹ {details?.plans?.price}
              </p>
              <p>
                <strong>GST ({details?.tax}%):</strong> ₹ {withoutTax}
              </p>
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              <p>
                <strong>Total amount payable:</strong>{" "}
                {`₹ ${details?.TotalAmount}`}
              </p>
              <p>
                <strong>Amount in words:</strong>{" "}
                {`${converter.toWords(details?.TotalAmount)}`}
              </p>
            </div>
          </div>
          <hr style={{ border: "1px solid #000" }} />
          <div>
            <p>
              <strong>Thanks for your Business</strong>
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <ComponentToPrint ref={componentRef} />
    </>
  );
};

export default Invoice;
