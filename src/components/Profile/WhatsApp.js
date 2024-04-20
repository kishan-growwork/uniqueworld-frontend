import React from "react";
import { GetQeCode } from "../../apis/profile";
import { Skeleton } from "antd";

const WhatsApp = () => {
  // const [qrImage, setQrImage] = useState("");
  // const [status, setStatus] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   (async () => {
  //       setIsLoading(true)
  //     const resp = await GetQeCode();
  //     if (resp?.data?.info?.isSuccess) {
  //       if (resp?.data?.data?.qr) {
  //         setQrImage(resp?.data?.data?.qr);
  //       }
  //       if (resp?.data?.data?.isConnected != undefined) {
  //           setStatus(resp?.data?.data?.isConnected)
  //       }
  //       setIsLoading(false)
  //     } else {
  //       setIsLoading(false)
  //     }
  //   })();
  // }, []);

  return (
    <>
      {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        {
            isLoading ? (
                <div style={{padding: '20px'}}>
                <Skeleton.Image style={{height: '256px', width : '256px'}} active={isLoading} />
                </div>
            ) : (

                <img src={qrImage} style={{height: '300px'}} />
            )
        }
      </div>
      <div style={{padding: '20px'}}>Status: <span style={status != null ? status == true ? {color :'green'} : {color: 'red'} : {color: '#000'}}>{status != null ? status == true ? 'Active' : 'Inactive' : ''}</span></div>
    </div> */}
      <div
        style={{
          display: "flex",
          height: "200px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>We are launching soon !!!</h1>
      </div>
    </>
  );
};

export default WhatsApp;
