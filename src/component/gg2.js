import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import style from "../css/test.module.css";

import { Modal, Button } from "antd";

const Test = () => {
  const VideoRef = useRef();
  const [seekTime, setSeekTime] = useState({
    check: false,
    time: 0,
  });

  const [corEvent, setCorEvent] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const handlePause = (e) => {
    // console.log("kya karu-->");
    setSeekTime({ ...seekTime, time: e.target.currentTime });
  };

  // const handleDuration = (e) => {
  //   VideoRef.current.seekTo(10, "seconds");
  // };
  const onReady = React.useCallback(() => {
    const timeToStart = seekTime.time;
    VideoRef.current.seekTo(timeToStart, "seconds");
  }, [VideoRef.current]);

  useEffect(() => {
    console.log(seekTime.check, seekTime.time);
  }, [seekTime]);

  return (
    <div className={style.masterContainer}>
      <div className={style.topContainer}>
        <div className={style.Container}>
          <ReactPlayer
            controls={true}
            muted={false}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            onPause={handlePause}
          />

          <Button
            type="primary"
            style={{
              background: "red",
              borderColor: "yellow",
              width: "fit-content",
            }}
            onClick={() => {
              setModalVisible(true);
              setSeekTime({ ...seekTime, check: true });
            }}
          >
            Vertically centered modal dialog
          </Button>

          <Modal
            title="Vertically centered modal dialog"
            centered
            visible={modalVisible}
            onOk={() => {
              setModalVisible(false);
              setSeekTime({ ...seekTime, check: false });
            }}
            onCancel={() => {
              setModalVisible(false);
              setSeekTime({ ...seekTime, check: false });
            }}
          >
            {seekTime.check ? (
              <ReactPlayer
                ref={VideoRef}
                onClick={(e) => {
                  // setCorEvent({
                  //   x: `${e.clientX - e.target.offsetLeft}`,
                  //   y: `${e.clientY - e.target.offsetTop}`,
                  // });

                  console.log("hjdkajkfjsl");
                }}
                controls={true}
                onReady={(e) => e.current.seekTo(100, "seconds")}
                // onReady={onReady}
                // playing={false}
                url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              />
            ) : (
              <p>Loading...</p>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Test;

// import React, { useEffect, useState } from "react";
// import "antd/dist/antd.min.css";
// import "antd/dist/antd.css";
// import "./index.css";
// import { Row, Col } from "antd";
// import Style from "./css/App.module.css";
// import IMG from "./img/pngkey.com-dancing-png-830689.png";
// import Video from "./component/Video";
// import Progress from "./component/Progress";
// import UploadPage from "./component/UploadPage";
// import Test from "./component/test";

// const style = {
//   // background: "grey",
//   boxShadow: "0 0 100px 10px rgba(1, 31, 85,0.25) ",
//   padding: "10px",
//   // filter: "blur(4px)",

//   minHeight: "50vh",
//   maxHeight: "100%",
//   overflow: "hidden",
//   borderRadius: "10px",
//   margin: "5px",
// };

// const center = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0,-50%)",
//   width: "100%",
// };

// function App() {
//   // state to get the list at global so as to be passed to any component
//   // const [seekTime, setSeekTime] = useState({
//   //   check: false,
//   //   time: 0,
//   // });
//   const [list, setList] = useState(null);
//   const [time, setTime] = useState(0);
//   const [cor, setCor] = useState("0x0");

//   // useEffect(() => {
//   //   console.log("time--->", time, "cor--->", cor);
//   // }, [time, cor]);
//   return (
//     <div className={Style.container}>
//       {/* <section className={Style.homeTop1}>
//         <div className={Style.svgContainer}>
//           <svg
//             style={{ minWidth: "800px" }}
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1440 320"
//           >
//             <path
//               fill="#0099ff"
//               fillOpacity="1"
//               d="M0,192L30,186.7C60,181,120,171,180,186.7C240,203,300,245,360,229.3C420,213,480,139,540,128C600,117,660,171,720,170.7C780,171,840,117,900,117.3C960,117,1020,171,1080,192C1140,213,1200,203,1260,176C1320,149,1380,107,1410,85.3L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
//             ></path>
//           </svg>
//         </div>

//         <div className={Style.title}>
//           <div>
//             <p>Its-Disco-admin</p>
//             <p className={Style.lowerLine}>Choose your style</p>
//           </div>
//           <img src={IMG} style={{ height: "500px" }} alt="disco_app" />
//         </div>
//       </section>

//       <section className={Style.homeTop2}>
//         <h1 style={{ padding: "20px", color: "white" }}>
//           ItsDisco-Admin Panel
//         </h1>
//         <div style={center}>
//           <Row
//             style={{ padding: "20px" }}
//             gutter={[10, { xs: 8, sm: 16, md: 24, lg: 32 }]}
//           >
//             <Col className="gutter-row " span={7}>
//               <div style={style}>
//                 <div className={Style.boxName}> Upload</div>{" "}
//                 <hr className={Style.horizontaLine} />
//                 <UploadPage
//                   funcToSetList={(val) => {
//                     setList(val);
//                   }}
//                 />
//               </div>
//             </Col>
//             <Col className="gutter-row" span={10}>
//               <div style={style}>
//                 <div className={Style.boxName}> video</div>{" "}
//                 <hr className={Style.horizontaLine} />
//                 {list ? (
//                   <Video
//                     li={list[0]}
//                     setTimeEvent={(time) => {
//                       setTime(time);
//                     }}
//                     setCorEvent={(cor) => setCor(cor)}
//                   />
//                 ) : (
//                   <div>noting stays </div>
//                 )}
//               </div>
//             </Col>
//             <Col className="gutter-row" span={7}>
//               <div style={style}>
//                 <div className={Style.boxName}> progress</div>
//                 <hr className={Style.horizontaLine} />
//                 <Progress />
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </section> */}
//       {/* <Test /> */}
//       {/* <Test
//         setTheSeekTime={(checkValue, seekToTime) =>
//           setSeekTime({ check: checkValue, time: seekToTime })
//         }
//         seekTime={seekTime}
//       /> */}

//       <Test />
//     </div>
//   );
// }

// export default App;
