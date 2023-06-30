import "./FaceRecognition.css";

export const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />

        {box.map((item, i) => {
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
