import React from "react";

const InfoBox = ({ text, value }) => {
  const InfoBoxStyle = {
    width: "600px",
    height: "65px",
    flexShrink: 0,
    borderRadius: "6px",
    border: "1px solid #695D3C",
    background: "rgba(255, 255, 255, 0.60)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const textStyle = {
    color: "#695D3C",
    fontFamily: '"Kdam Thmor", sans-serif',
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 550,
    lineHeight: "normal",
    marginRight: "10px",
  };

  const dividerStyle = {
    height: "100%",
    width: "1px",
    background: "#695D3C",
  };

  const valueStyle = {
    color: "#695D3C",
    fontFamily: '"Kdam Thmor", sans-serif',
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 550,
  };

  return (
    <div style={InfoBoxStyle} className="px-6">
      <span style={textStyle}>{text}</span>
      <div className="px-5">
        <div style={dividerStyle}></div>
        <span style={valueStyle}>{value}</span>
      </div>
    </div>
  );
};

export default InfoBox;
