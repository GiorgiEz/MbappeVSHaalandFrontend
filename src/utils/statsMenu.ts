import { JSON_URLS } from "../api/jsonUrls";


export const STATS_MENU = [
    {
        title: "All Time Stats",

        items: [
            {
                name: "Career",
                path: "/all-time/career",
                json: JSON_URLS.allTime.career
            },
            {
                name: "Competitions",
                path: "/all-time/competitions",
                json: JSON_URLS.allTime.competitions
            },
            {
                name: "Seasons",
                path: "/all-time/seasons",
                json: JSON_URLS.allTime.seasons
            },
            {
                name: "Age Comparison",
                path: "/all-time/age",
                json: JSON_URLS.allTime.age
            },
            {
                name: "Favourite Opponents",
                path: "/all-time/favourite_opponents",
                json: JSON_URLS.allTime.favourite_opponents
            },
            {
                name: "Finals",
                path: "/all-time/finals",
                json: JSON_URLS.allTime.finals
            }
        ]
    },

    {
        title: "Club Stats",

        items: [
            {
                name: "Clubs",
                path: "/club/clubs",
                json: JSON_URLS.club.clubs
            },
            {
                name: "Competitions",
                path: "/club/competitions",
                json: JSON_URLS.allTime.competitions
            },
            {
                name: "Seasons",
                path: "/club/seasons",
                json: JSON_URLS.club.seasons
            }
        ]
    },

    {
        title: "Country Stats",

        items: [
            {
                name: "Competitions",
                path: "/country/competitions",
                json: JSON_URLS.allTime.competitions
            },
            {
                name: "Years",
                path: "/country/years",
                json: JSON_URLS.country.years
            }
        ]
    },

    {
        title: "Honours",

        items: [
            {
                name: "Individual Awards",
                path: "/honours/individual-awards",
                json: JSON_URLS.honours
            },
            {
                name: "Team Trophies",
                path: "/honours/team-trophies",
                json: JSON_URLS.honours
            }
        ]
    }
];