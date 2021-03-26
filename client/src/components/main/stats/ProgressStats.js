import React, { Fragment } from "react";
import ProgressBar from "../../layout/ProgressBar";
import { v4 as uuidv4 } from "uuid";

const ProgressStats = ({ data, title, total, background }) => {
  return (
    <div className="item">
      <h5>{title}</h5>
      {data.length !== 0 ? (
        <Fragment>
          <ProgressBar
            value={data[0].amount}
            id={uuidv4()}
            title={data[0].name}
            total={total}
            background={background}
          />
          {data.length > 1 && (
            <ProgressBar
              value={data[1].amount}
              id={uuidv4()}
              title={data[1].name}
              total={total}
              background={background}
            />
          )}
          {data.length > 2 && (
            <ProgressBar
              value={data[2].amount}
              id={uuidv4()}
              title={data[2].name}
              total={total}
              background={background}
            />
          )}
        </Fragment>
      ) : (
        <p>Finish a cart to get Stats</p>
      )}
    </div>
  );
};

export default ProgressStats;
