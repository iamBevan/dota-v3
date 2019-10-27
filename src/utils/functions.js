import { heroData } from "../constants/heroData";

export const handleImg = heroId => {
    const url = heroData.heroes[heroId].img;
    const fullUrl = `https://api.opendota.com${url}`;
    return fullUrl;
};