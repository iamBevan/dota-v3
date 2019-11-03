export interface MatchData {
    match_id: number;
    dire_score: number;
    duration: number;
    players: Players[];
}

interface Players {
    personaname: string;
    kills: number;
    deaths: number;
    assists: number;
    gold_per_min: number;
    xp_per_min: number;
    total_gold: number;
    gold_spent: number;
    hero_damage: number;
    tower_damage: number;
}
