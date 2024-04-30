import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import actions from "../../redux/payment/actions";

const Paymentpreiview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const details = useSelector(
    (state) => state?.payment?.paymentDetails?.response
  );
  let invoiceto = ""
  if(details?.Company!==null&&details?.Company!==""&&details?.Company!==null){
    invoiceto = details?.Company
  }
  else{
    invoiceto = `${details?.firstname} ${details?.lastname}`
  }
  console.info("--------------------");
  console.info("details => ", details);
  console.info("--------------------");
  // const agencysaddress =
  //   "335-336, Fortune High Street, Green City Road, Near Madhuvan Circle, Adajan, Surat - 395009";
  useEffect(async () => {
    await dispatch({
      type: actions.GET_PAYMENTS_DETAILS,
      payload: { transactionId: params?.merchantTransactionid },
    });
  }, []);
  return (
    <>
      <div>
        <div className="content-wrapper p-0 animate__animated animate__fadeIn">
          <div className="invoice-preview-wrapper">
            <div className="invoice-preview row">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="invoice-preview-card card">
                  <div className="invoice-padding pb-0 card-body">
                    <h4 className="invoice-title">Invoice from:</h4>
                    <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                      <div>
                        <p className="mb-25 card-text">
                          Trade name: Unique World
                        </p>
                        <p className="mb-25 card-text">
                          GST No: 24AMVPG6524E1Z0
                        </p>
                        <p className="mb-25 card-text">
                          Address: 335-336, Fortune High Street, <br /> Green
                          City Road, <br /> Near Madhuvan Circle, <br />
                          Adajan, Surat - 395009
                        </p>
                      </div>
                      <div className="mt-md-0 mt-2">
                        <h4 className="invoice-title">
                          Invoice <span className="invoice-number">#4987</span>
                        </h4>
                        <div className="invoice-date-wrapper d-flex gap-1">
                          <p className="invoice-date-title">Date Issued:</p>
                          <p className="invoice-date">
                            {details?.createdAt?.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="invoice-spacing" />
                  <div className="d-flex justify-content-between px-2">
                  <div>
                    <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mb-2">
                      <div>
                    <h4 className="invoice-title">Invoice to:</h4>
                        <p className="mb-25 card-text">
                          Trade name: {invoiceto}
                        </p>
                        <p className="mb-25 card-text">
                          GST No: 24AMVPG6524E1Z0
                        </p>
                        <p className="mb-25 card-text">
                          Address: 335-336, Fortune High Street, <br /> Green
                          City Road, <br /> Near Madhuvan Circle, <br />
                          Adajan, Surat - 395009
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mb-2">
                      <div>
                    <h4 className="invoice-title">Invoice from:</h4>
                        <p className="mb-25 card-text">
                          Trade name:
                        </p>
                        <p className="mb-25 card-text">
                          GST No: 24AMVPG6524E1Z0
                        </p>
                        <p className="mb-25 card-text">
                          Address: 335-336, Fortune High Street, <br /> Green
                          City Road, <br /> Near Madhuvan Circle, <br />
                          Adajan, Surat - 395009
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="py-1">Plan Name</th>
                          <th className="py-1">Price</th>
                          <th className="py-1">Tax</th>
                          <th className="py-1">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1">
                            <b className="card-text fw-bold mb-25">
                              {details?.plans?.planName}
                            </b>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{`₹ ${details?.price}`}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{`${details?.tax} %`}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{`₹ ${details?.TotalAmount}`}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="invoice-padding pb-0 card-body">
                    <div className="invoice-sales-total-wrapper row">
                      <div
                        order="[object Object]"
                        className="mt-md-0 mt-3 col-md-6"
                      >
                        <p className="mb-0 card-text">
                          <span className="fw-bold">Salesperson:</span>{" "}
                          <span className="ms-75">Alfie Solomons</span>
                        </p>
                      </div>
                      {/* <div className="d-flex justify-content-end col-md-6">
                        <div className="invoice-total-wrapper gap-3">
                          <div className="invoice-total-item gap-4 d-flex justify-content-between">
                            <p className="invoice-total-title">Subtotal:</p>
                            <p className="invoice-total-amount">$1800</p>
                          </div>
                          <div className="invoice-total-item d-flex justify-content-between">
                            <p className="invoice-total-title">Discount:</p>
                            <p className="invoice-total-amount">$28</p>
                          </div>
                          <div className="invoice-total-item d-flex justify-content-between">
                            <p className="invoice-total-title">Tax:</p>
                            <p className="invoice-total-amount">21%</p>
                          </div>
                          <hr className="my-50" />
                          <div className="invoice-total-item d-flex justify-content-between">
                            <p className="invoice-total-title">Total:</p>
                            <p className="invoice-total-amount">$1690</p>
                          </div>
                        </div>
                      </div> */}
                  {/* </div>
                  </div> */}
                  {/* <div className="invoice-padding pt-0 card-body">
                    <div className="row">
                      <div className="col-sm-12">
                        <span className="fw-bold">Note: </span>
                        <span>
                          It was a pleasure working with you and your team. We
                          hope you will keep us in mind for future freelance
                          projects. Thank You!
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-sm-12 col-md-4 col-xl-3">
        <div className="invoice-action-wrapper card">
          <div className="card-body justify-content-center align-items-center">
            <button className="mb-75 btn btn-outline-secondary d-block w-100">
              Download
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Paymentpreiview;
