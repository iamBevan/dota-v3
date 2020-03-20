import React from "react"
import { Summary } from "./Summary"
import "../../sass/main.scss"

export default {
    title: "Summary",
    component: Summary
}

export const PlayerSummary = () => (
    <Summary
        avatarmedium='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/29/299a4721a2c10e8850c5850745a43c51744aaee7_medium.jpg'
        lose={50}
        personaname='kb'
        win={100}
    />
)

PlayerSummary.story = {
    name: "Player Summary"
}
