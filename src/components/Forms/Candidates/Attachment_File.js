import React, { useState } from "react";
import { FileText, Image } from "react-feather";
import { Button, Col, Input, Label, Row } from "reactstrap";
import { ReactComponent as Cancel } from "../../../assets/images/x.svg";

const Attachment_File = ({
  candidate,
  update,
  isDisabledAllFields,
  fileOnChangeHandler = () => {},
}) => {
  const [isShowFileName, setIsShowFileName] = useState(true);
  const [isShowImageName, setIsShowImageName] = useState(true);

  const decodedUrl = decodeURIComponent(candidate?.resume);
  const fileName = decodedUrl.substring(decodedUrl.lastIndexOf("/") + 1);
  const decodedUrl1 = decodeURIComponent(candidate?.image);
  const imageName = decodedUrl1.substring(decodedUrl1.lastIndexOf("/") + 1);
  const themecolor = localStorage.getItem("themecolor");
  const [focus, setIsfocus] = useState(null);
  return (
    <div>
      <Row className="gy-1 pt-75" style={{ marginTop: "10px" }}>
        <div>
          <h4>Attachment Information</h4>
        </div>

        <Col lg={6} xs={12} xl={6}>
          <Label>Resume</Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {update && candidate?.resume?.length > 0 && isShowFileName ? (
              <Label>
                {fileName != "undefined"
                  ? `${fileName?.slice(0, 20)}......`
                  : ""}
              </Label>
            ) : (
              <Input
                type="file"
                accept=".pdf"
                id="resume"
                onFocus={() => setIsfocus("resume")}
                onBlur={() => setIsfocus(null)}
                style={{
                  borderColor: focus === "resume" && themecolor,
                }}
                name="customFile"
                disabled={isDisabledAllFields}
                placeholder={"fileName"}
                onChange={(e) => {
                  fileOnChangeHandler(e);
                }}
              />
            )}
            {update && candidate?.resume?.length > 0 ? (
              <Button
                type="button"
                className="add-new-user"
                color="link"
                onClick={() => setIsShowFileName(!isShowFileName)}
              >
                <Cancel height={16} width={16} />
              </Button>
            ) : null}
            {update && candidate?.resume?.length > 0 ? (
              <Button
                type="button"
                className="add-new-user"
                color="link"
                onClick={() => window.open(candidate?.resume)}
              >
                View
              </Button>
            ) : null}
          </div>
        </Col>

        <Col lg={6} xs={12} xl={6}>
          <Label>Passport Size Photo</Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {update && candidate?.image?.length > 0 && isShowImageName ? (
              <Label>
                {imageName != "undefined"
                  ? `${imageName?.slice(0, 20)}......`
                  : ""}
              </Label>
            ) : (
              <Input
                type="file"
                onFocus={() => setIsfocus("file")}
                onBlur={() => setIsfocus(null)}
                style={{
                  borderColor: focus === "file" && themecolor,
                }}
                accept="image/png, image/jpeg, image/jpg"
                id="image"
                name="customFile"
                disabled={isDisabledAllFields}
                onChange={(e) => fileOnChangeHandler(e)}
              />
            )}

            {update && candidate?.image?.length > 0 ? (
              <Button
                type="button"
                className="add-new-user"
                color="link"
                onClick={() => setIsShowImageName(!isShowImageName)}
              >
                <Cancel height={16} width={16} />
              </Button>
            ) : null}

            {update && candidate?.image?.length > 0 ? (
              <Button
                type="button"
                className="add-new-user"
                color="link"
                onClick={() => window.open(candidate?.image)}
              >
                View
              </Button>
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Attachment_File;
