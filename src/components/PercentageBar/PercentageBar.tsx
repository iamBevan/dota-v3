import React from "react";

export const PercentageBar = props => {
    const container = {
        width: "100%",
        backgroundColor: "red",
        height: "100%"
    };

    const percentage = {
        color: "white",
        width: `${props.percentage}%`,
        backgroundColor: "#4caf50",
        height: "100%"
    };

    return (
        <div style={container}>
            <div style={percentage} />
        </div>
    );
};
