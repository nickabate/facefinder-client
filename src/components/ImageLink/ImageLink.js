import "./ImageLink.css";

export const ImageLink = ({ onInputChange, onSubmit }) => {
  return (
    <div className>
      <div className="br3 shadow-5 form links pa2">
        <p className="f3">
          Face Finder will detect faces in your pictures. Give it a try!
        </p>
        <p className="f4">
          Here are some links to try. Copy and paste them into the detection
          bar!
        </p>
        <p className="">
          https://www.manicare.com.au/on/demandware.static/-/Library-Sites-mcp-shared-library/default/dw45e32389/manicare/blog/manicare-blog-face-shapes-inlaid-2.jpg
        </p>
        <p className="">
          https://images.newscientist.com/wp-content/uploads/2022/02/14174128/PRI_223554170.jpg?width=900
        </p>
      </div>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
