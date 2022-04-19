import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import style from "../css/test.module.css";

import { Modal, Button } from "antd";

const Test = ({ link }) => {
  const VideoRef = useRef();
  const [seekTime, setSeekTime] = useState({
    check: false,
    time: 0,
  });

  const [corEvent, setCorEvent] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false);

  const handlePause = (e) => {
    setSeekTime({ ...seekTime, time: e.target.currentTime });
  };

  useEffect(() => {
    console.log(seekTime.check, seekTime.time);

    // this is the controller to video to specified time
    if (VideoRef.current != undefined) {
      console.log("videoRef", VideoRef);
      VideoRef.current.seekTo(seekTime.time, "seconds");
    }
  }, [seekTime]);

  return (
    <div className={style.masterContainer}>
      <div className={style.topContainer}>
        <div className={style.Container}>
          <ReactPlayer
            controls={true}
            muted={false}
            url={link}
            onPause={handlePause}
            onProgress={(e) => console.log("yeh hai value", e)}
            width="100%"
          />

          <React.StrictMode>
            <Button
              type="primary"
              style={{
                marginTop: "10px",
                background: "#050A30",
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
              // mask={false}
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
              width="fit-content"
              bodyStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            >
              {/* video player in modal */}
              {seekTime.check ? (
                <div className={style.modalConatine}>
                  <ReactPlayer
                    ref={VideoRef}
                    onClick={(e) => {
                      setCorEvent({
                        x: `${e.clientX - e.target.offsetLeft}`,
                        y: `${e.clientY - e.target.offsetTop}`,
                      });
                    }}
                    url={link}
                  />

                  <div className={style.sideContainer}>
                    <h4>dataLog</h4>
                    <section className={style.containerHolderModal}></section>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}

              {corEvent ? console.log(corEvent) : console.log("not yet set")}
            </Modal>
          </React.StrictMode>
        </div>
      </div>
    </div>
  );
};

export default Test;
