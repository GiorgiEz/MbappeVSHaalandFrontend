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
                json: JSON_URLS.allTime.byCompetition
            },
            {
                name: "Age Comparison",
                path: "/all-time/age",
                json: JSON_URLS.allTime.age
            },
            {
                name: "Favourite Opponents",
                path: "/all-time/opponents",
                json: JSON_URLS.allTime.favouriteOpponents
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
                name: "By Club",
                path: "/club/by-club",
                json: JSON_URLS.club.byClub
            },
            {
                name: "By Season",
                path: "/club/by-season",
                json: JSON_URLS.club.bySeason
            }
        ]
    },


    {
        title: "Country Stats",

        items: [
            {
                name: "Competitions",
                path: "/country/competitions",
                json: JSON_URLS.country.byCompetition
            },
            {
                name: "By Year",
                path: "/country/year",
                json: JSON_URLS.country.byYear
            }
        ]
    },

    {
        title: "Honours",

        items: []
    }
];