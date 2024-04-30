import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Paymentpreiview = () => {
  const params = useParams();
  console.log("-------------------");
  console.log("params", params);
  console.log("-------------------");
  const agencysaddress =
    "Office 149, 450 South Brand Brooklyn San Diego County, CA 91905, USA";
  const agencysNumber = "+1 (123) 456 7891, +44 (876) 543 2198";
  return (
    <>
      <div>
        <div className="content-wrapper p-0 animate__animated animate__fadeIn">
          <div className="invoice-preview-wrapper">
            <div className="invoice-preview row">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="invoice-preview-card card">
                  <div className="invoice-padding pb-0 card-body">
                    <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                      <div>
                        <p className="mb-25 card-text">{agencysaddress}</p>
                        <p className="mb-25 card-text">{agencysNumber}</p>
                      </div>
                      <div className="mt-md-0 mt-2">
                        <h4 className="invoice-title">
                          Invoice <span className="invoice-number">#4987</span>
                        </h4>
                        <div className="invoice-date-wrapper d-flex gap-3">
                          <p className="invoice-date-title">Date Issued:</p>
                          <p className="invoice-date">13 Dec 2019</p>
                        </div>
                        <div className="invoice-date-wrapper d-flex gap-3">
                          <p className="invoice-date-title">Due Date:</p>
                          <p className="invoice-date">23 Apr 2019</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="invoice-spacing" />
                  <div className="invoice-padding pb-0 card-body">
                    <p>Invoice to:</p>
                    <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                      <div>
                        <p className="mb-25 card-text">
                          Office 149, 450 South Brand Brooklyn
                        </p>
                        <p className="mb-25 card-text">
                          San Diego County, CA 91905, USA
                        </p>
                        <p className="mb-0 card-text">
                          +1 (123) 456 7891, +44 (876) 543 2198
                        </p>
                      </div>
                      <div className="mt-md-0 mt-2">
                        <h4 className="invoice-title">
                          Invoice <span className="invoice-number">#4987</span>
                        </h4>
                        <div className="invoice-date-wrapper">
                          <p className="invoice-date-title">Date Issued:</p>
                          <p className="invoice-date">13 Dec 2019</p>
                        </div>
                        <div className="invoice-date-wrapper">
                          <p className="invoice-date-title">Due Date:</p>
                          <p className="invoice-date">23 Apr 2019</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="py-1">Order description</th>
                          <th className="py-1">Price</th>
                          <th className="py-1">Tax</th>
                          <th className="py-1">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1">
                            <p className="card-text fw-bold mb-25">
                              Native App Development
                            </p>
                            <p className="card-text text-nowrap">
                              Developed a full stack native app using React
                              Native, Bootstrap &amp; Python
                            </p>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">$60.00</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">30</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">$1,800.00</span>
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
