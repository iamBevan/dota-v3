import React from "react";

export const PercentageBar = props => {
    const container = {
        width: "100%",
        backgroundColor: "rgb(237, 94, 94)",
        height: "100%"
    };

    const percentage = {
        color: "white",
        width: `${props.percentage}%`,
        backgroundColor: "rgb(118, 173, 121)",
        height: "100%"
    };

    return (
        <div style={container}>
            <div style={percentage} />
        </div>
    );
};
