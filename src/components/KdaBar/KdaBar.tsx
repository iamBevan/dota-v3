import React from "react";

const KdaPercentageBar = props => {
    const container = {
        width: "100%",
        height: "100%",
        display: "flex"
    };

    const kills = {
        color: "white",
        width: `${props.kills}%`,
        backgroundColor: "rgb(118, 173, 121)",
        height: "100%"
    };

    const deaths = {
        color: "white",
        width: `${props.deaths}%`,
        backgroundColor: "rgb(255, 76, 76)",
        height: "100%"
    };

    const assists = {
        color: "white",
        width: `${props.assists}%`,
        backgroundColor: "rgb(124, 153, 168)",
        height: "100%"
    };

    return (
        <div style={container}>
            <div style={kills} />
            <div style={deaths} />
            <div style={assists} />
        </div>
    );
};

const KdaBar = () => {};

let kills;
let deaths;
let assists;

const calculatePercentages = (k, d, a) => {
    const total = k + d + a;
    kills = (k / total) * 100;
    deaths = (d / total) * 100;
    assists = (a / total) * 100;

    calculatePercentages(12, 11, 11);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            <div style={{ height: "5px", width: "500px", margin: "auto" }}>
                <KdaPercentageBar
                    kills={kills}
                    deaths={deaths}
                    assists={assists}
                />
            </div>
        </div>
    );
};

export default KdaBar;
