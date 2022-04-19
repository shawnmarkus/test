import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import style from "../css/test.module.css";

import { Modal, Button } from "antd";

const Test = ({ setTheSeekTime, seekTime }) => {
  const VideoRef = useRef();

  const [corEvent, setCorEvent] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const handlePause = (e) => {
    // console.log("kya karu-->");
    // setSeekTime({ ...seekTime, time: e.target.currentTime });
    setTheSeekTime(true, e.target.currentTime);
  };

  // const handleDuration = (e) => {
  //   VideoRef.current.seekTo(10, "seconds");
  // };
  const onReady = React.useCallback(() => {
    // const timeToStart = 7 * 60 + 12.6;
    VideoRef.current.seekTo(seekTime.time, "seconds");
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
            onProgress={(e) => console.log(e)}
            // onSeek={5}
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
              setTheSeekTime(true, seekTime.time);
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
                  setCorEvent(
                    // `${e.clientX - e.target.offsetLeft}x${
                    //   e.clientY - e.target.offsetTop
                    // }`
                    {
                      x: `${e.clientX - e.target.offsetLeft}`,
                      y: `${e.clientY - e.target.offsetTop}`,
                    }
                  );
                }}
                controls={true}
                onReady={onReady}
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
