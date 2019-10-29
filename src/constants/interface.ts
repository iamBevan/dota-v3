export interface RecentMatchData {
    match_id: number;
    player_slot: number;
    radiant_win: boolean;
    duration: number;
    game_mode: number;
    // "lobby_type": number;
    hero_id: number;
    start_time: number;
    // "version": number;
    kills: number;
    deaths: number;
    assists: number;
    skill: number;
    // "lane": number;
    // "lane_role": number;
    // "is_roaming": boolean;
    // "cluster": number;
    // "leaver_status": number;
    // "party_size": number;
}

export interface HeroDataList {
    heroes: {
        [key: string]: HeroDetails;
    };
}

export interface GameModesList {
    modes: {
        [key: string]: GameModes;
    };
}

export interface GameModes {
    id: number;
    name: string;
    balanced?: boolean;
}

export interface HeroDetails {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    img: string;
    icon: string;
    base_health: number;
    base_health_regen: number | null;
    base_mana: number;
    base_mana_regen: number | null;
    base_armor: number;
    base_mr: number;
    base_attack_min: number;
    base_attack_max: number;
    base_str: number;
    base_agi: number;
    base_int: number;
    str_gain: number;
    agi_gain: number;
    int_gain: number;
    attack_range: number;
    projectile_speed: number;
    attack_rate: number;
    move_speed: number;
    turn_rate: number;
    cm_enabled: boolean;
    legs: number;
}
