import { JSON_URLS } from "../api/jsonUrls";


export const STATS_MENU = [
    {
        title: "All Time Stats",

        items: [
            {
                name: "Career",
                path: "/stats/all-time/career",
                json: JSON_URLS.allTime.career
            },
            {
                name: "Competitions",
                path: "/stats/all-time/competitions",
                json: JSON_URLS.allTime.byCompetition
            },
            {
                name: "Age Comparison",
                path: "/stats/all-time/age",
                json: JSON_URLS.allTime.age
            },
            {
                name: "Favourite Opponents",
                path: "/stats/all-time/opponents",
                json: JSON_URLS.allTime.favouriteOpponents
            },
            {
                name: "Finals",
                path: "/stats/all-time/finals",
                json: JSON_URLS.allTime.finals
            }
        ]
    },


    {
        title: "Club Stats",

        items: [
            {
                name: "By Club",
                path: "/stats/club/by-club",
                json: JSON_URLS.club.byClub
            },
            {
                name: "By Season",
                path: "/stats/club/by-season",
                json: JSON_URLS.club.bySeason
            }
        ]
    },


    {
        title: "Country Stats",

        items: [
            {
                name: "Competitions",
                path: "/stats/country/competitions",
                json: JSON_URLS.country.byCompetition
            },
            {
                name: "By Year",
                path: "/stats/country/year",
                json: JSON_URLS.country.byYear
            }
        ]
    }
];