import { heroData } from "../constants/heroData";
import { gameMode } from "../constants/gameMode";
// import { HeroDetails } from "../constants/interface";

export const handleImg = (heroId: number) => {
    const url = heroData.heroes[heroId].img;
    const fullUrl = `https://api.opendota.com${url}`;
    return fullUrl;
};

export const handleLaneImg = (laneId: number) => {
    if (laneId === null) {
        return;
    }
    const url = `https://www.opendota.com/assets/images/dota2/lane_${laneId}.svg`;
    return url;
};

export const handleGameMode = (modeId: number) => {
    return gameMode.modes[modeId].name;
};

export const heroName = (id: number) => {
    return heroData.heroes[id].localized_name;
};

export const matchDuration = (time: number) => {
    let hrs = Math.floor(time / 3600);
    let mins = Math.floor((time % 3600) / 60);
    let secs = time % 60;

    let result = "";

    if (hrs > 0) {
        result += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    result += "" + mins + ":" + (secs < 10 ? "0" : "");
    result += "" + secs;

    return result;
};
