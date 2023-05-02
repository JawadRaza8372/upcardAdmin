import React from "react";
import "./CustomModel.scss";
import CloseIcon from "@material-ui/icons/Close";
function CustomModel({ showModel, toggleModel, children }) {
  return (
    <>
      {showModel && (
        <>
          <div className="modelbgdiv">
            <div onClick={toggleModel}>
              <CloseIcon className="closebtn" />
            </div>

            <div className="modelcontainer">{children}</div>
          </div>
        </>
      )}
    </>
  );
}

export default CustomModel;
