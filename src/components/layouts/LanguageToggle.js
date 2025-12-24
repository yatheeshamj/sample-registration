import React, { Component, Fragment } from 'react';
import cookie from 'react-cookies';
import { withLocalize, Translate } from 'spotify-shared-web/localize'
import { renderToStaticMarkup } from "react-dom/server";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import "./footer.scss";
import { Row, Col, Button } from 'react-bootstrap';
import { initializeConfigurations } from '../../actions/appActions'
import { languages } from 'spotify-shared/api/opportunities';
import { agentProfile } from 'spotify-shared/selectors';
import { Modal, Result } from 'antd'



class LanguageToggle extends Component {

    constructor(props) {
        super(props);


        this.state = {
            showMap: false,
            // -------------------------------------------------------------------------------------------------------------------------------------------

            // countries: [],
            // showCountrySelect: cookie.load("remoteIPAddress") !== undefined ? false : true
            // -------------------------------------------------------------------------------------------------------------------------------------------


        }
    }

    async componentDidMount() {
        await this.initializeLanguages();

        // const response = [
        //     {
        //         "name": {
        //             "common": "Canada",
        //             "official": "Canada",
        //             "nativeName": {
        //                 "eng": {
        //                     "official": "Canada",
        //                     "common": "Canada"
        //                 },
        //                 "fra": {
        //                     "official": "Canada",
        //                     "common": "Canada"
        //                 }
        //             }
        //         },
        //         "tld": [
        //             ".ca"
        //         ],
        //         "cca2": "CA",
        //         "ccn3": "124",
        //         "cca3": "CAN",
        //         "cioc": "CAN",
        //         "independent": true,
        //         "status": "officially-assigned",
        //         "unMember": true,
        //         "currencies": {
        //             "CAD": {
        //                 "name": "Canadian dollar",
        //                 "symbol": "$"
        //             }
        //         },
        //         "idd": {
        //             "root": "+1",
        //             "suffixes": [
        //                 ""
        //             ]
        //         },
        //         "capital": [
        //             "Ottawa"
        //         ],
        //         "altSpellings": [
        //             "CA"
        //         ],
        //         "region": "Americas",
        //         "subregion": "North America",
        //         "languages": {
        //             "eng": "English",
        //             "fra": "French"
        //         },
        //         "translations": {
        //             "ara": {
        //                 "official": "????",
        //                 "common": "????"
        //             },
        //             "bre": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "ces": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "cym": {
        //                 "official": "Canada",
        //                 "common": "Canada"
        //             },
        //             "deu": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "est": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "fin": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "fra": {
        //                 "official": "Canada",
        //                 "common": "Canada"
        //             },
        //             "hrv": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "hun": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "ita": {
        //                 "official": "Canada",
        //                 "common": "Canada"
        //             },
        //             "jpn": {
        //                 "official": "???",
        //                 "common": "???"
        //             },
        //             "kor": {
        //                 "official": "???",
        //                 "common": "???"
        //             },
        //             "nld": {
        //                 "official": "Canada",
        //                 "common": "Canada"
        //             },
        //             "per": {
        //                 "official": "??????",
        //                 "common": "??????"
        //             },
        //             "pol": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "por": {
        //                 "official": "Canadá",
        //                 "common": "Canadá"
        //             },
        //             "rus": {
        //                 "official": "??????",
        //                 "common": "??????"
        //             },
        //             "slk": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "spa": {
        //                 "official": "Canadá",
        //                 "common": "Canadá"
        //             },
        //             "srp": {
        //                 "official": "??????",
        //                 "common": "??????"
        //             },
        //             "swe": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "tur": {
        //                 "official": "Kanada",
        //                 "common": "Kanada"
        //             },
        //             "urd": {
        //                 "official": "??????",
        //                 "common": "??????"
        //             },
        //             "zho": {
        //                 "official": "???",
        //                 "common": "???"
        //             }
        //         },
        //         "latlng": [
        //             60,
        //             -95
        //         ],
        //         "landlocked": false,
        //         "borders": [
        //             "USA"
        //         ],
        //         "area": 9984670,
        //         "demonyms": {
        //             "eng": {
        //                 "f": "Canadian",
        //                 "m": "Canadian"
        //             },
        //             "fra": {
        //                 "f": "Canadienne",
        //                 "m": "Canadien"
        //             }
        //         },
        //         "flag": "????",
        //         "maps": {
        //             "googleMaps": "https://goo.gl/maps/jmEVLugreeqiZXxbA",
        //             "openStreetMaps": "https://www.openstreetmap.org/relation/1428125"
        //         },
        //         "population": 38005238,
        //         "gini": {
        //             "2017": 33.3
        //         },
        //         "fifa": "CAN",
        //         "car": {
        //             "signs": [
        //                 "CDN"
        //             ],
        //             "side": "right"
        //         },
        //         "timezones": [
        //             "UTC-08:00",
        //             "UTC-07:00",
        //             "UTC-06:00",
        //             "UTC-05:00",
        //             "UTC-04:00",
        //             "UTC-03:30"
        //         ],
        //         "continents": [
        //             "North America"
        //         ],
        //         "flags": {
        //             "png": "https://flagcdn.com/w320/ca.png",
        //             "svg": "https://flagcdn.com/ca.svg",
        //             "alt": "The flag of Canada is composed of a red vertical band on the hoist and fly sides and a central white square that is twice the width of the vertical bands. A large eleven-pointed red maple leaf is centered in the white square."
        //         },
        //         "coatOfArms": {
        //             "png": "https://mainfacts.com/media/images/coats_of_arms/ca.png",
        //             "svg": "https://mainfacts.com/media/images/coats_of_arms/ca.svg"
        //         },
        //         "startOfWeek": "sunday",
        //         "capitalInfo": {
        //             "latlng": [
        //                 45.42,
        //                 -75.7
        //             ]
        //         },
        //         "postalCode": {
        //             "format": "@#@ #@#",
        //             "regex": "^([ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJKLMNPRSTVWXYZ]) ?(\\d[ABCEGHJKLMNPRSTVWXYZ]\\d)$"
        //         }
        //     },
        //     {
        //         "name": {
        //             "common": "Jamaica",
        //             "official": "Jamaica",
        //             "nativeName": {
        //                 "eng": {
        //                     "official": "Jamaica",
        //                     "common": "Jamaica"
        //                 },
        //                 "jam": {
        //                     "official": "Jamaica",
        //                     "common": "Jamaica"
        //                 }
        //             }
        //         },
        //         "tld": [
        //             ".jm"
        //         ],
        //         "cca2": "JM",
        //         "ccn3": "388",
        //         "cca3": "JAM",
        //         "cioc": "JAM",
        //         "independent": true,
        //         "status": "officially-assigned",
        //         "unMember": true,
        //         "currencies": {
        //             "JMD": {
        //                 "name": "Jamaican dollar",
        //                 "symbol": "$"
        //             }
        //         },
        //         "idd": {
        //             "root": "+1",
        //             "suffixes": [
        //                 "876"
        //             ]
        //         },
        //         "capital": [
        //             "Kingston"
        //         ],
        //         "altSpellings": [
        //             "JM"
        //         ],
        //         "region": "Americas",
        //         "subregion": "Caribbean",
        //         "languages": {
        //             "eng": "English",
        //             "jam": "Jamaican Patois"
        //         },
        //         "translations": {
        //             "ara": {
        //                 "official": "???????",
        //                 "common": "???????"
        //             },
        //             "bre": {
        //                 "official": "Jamaika",
        //                 "common": "Jamaika"
        //             },
        //             "ces": {
        //                 "official": "Jamajka",
        //                 "common": "Jamajka"
        //             },
        //             "cym": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "deu": {
        //                 "official": "Jamaika",
        //                 "common": "Jamaika"
        //             },
        //             "est": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "fin": {
        //                 "official": "Jamaika",
        //                 "common": "Jamaika"
        //             },
        //             "fra": {
        //                 "official": "Jamaïque",
        //                 "common": "Jamaïque"
        //             },
        //             "hrv": {
        //                 "official": "Jamajka",
        //                 "common": "Jamajka"
        //             },
        //             "hun": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "ita": {
        //                 "official": "Giamaica",
        //                 "common": "Giamaica"
        //             },
        //             "jpn": {
        //                 "official": "?????",
        //                 "common": "?????"
        //             },
        //             "kor": {
        //                 "official": "????",
        //                 "common": "????"
        //             },
        //             "nld": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "per": {
        //                 "official": "????????",
        //                 "common": "????????"
        //             },
        //             "pol": {
        //                 "official": "Jamajka",
        //                 "common": "Jamajka"
        //             },
        //             "por": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "rus": {
        //                 "official": "??????",
        //                 "common": "??????"
        //             },
        //             "slk": {
        //                 "official": "Jamajka",
        //                 "common": "Jamajka"
        //             },
        //             "spa": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "srp": {
        //                 "official": "???????",
        //                 "common": "???????"
        //             },
        //             "swe": {
        //                 "official": "Jamaica",
        //                 "common": "Jamaica"
        //             },
        //             "tur": {
        //                 "official": "Jamaika",
        //                 "common": "Jamaika"
        //             },
        //             "urd": {
        //                 "official": "?????",
        //                 "common": "?????"
        //             },
        //             "zho": {
        //                 "official": "???",
        //                 "common": "???"
        //             }
        //         },
        //         "latlng": [
        //             18.25,
        //             -77.5
        //         ],
        //         "landlocked": false,
        //         "area": 10991,
        //         "demonyms": {
        //             "eng": {
        //                 "f": "Jamaican",
        //                 "m": "Jamaican"
        //             },
        //             "fra": {
        //                 "f": "Jamaïcaine",
        //                 "m": "Jamaïcain"
        //             }
        //         },
        //         "flag": "????",
        //         "maps": {
        //             "googleMaps": "https://goo.gl/maps/Z8mQ6jxnRQKFwJy9A",
        //             "openStreetMaps": "https://www.openstreetmap.org/relation/555017"
        //         },
        //         "population": 2961161,
        //         "gini": {
        //             "2004": 45.5
        //         },
        //         "fifa": "JAM",
        //         "car": {
        //             "signs": [
        //                 "JA"
        //             ],
        //             "side": "left"
        //         },
        //         "timezones": [
        //             "UTC-05:00"
        //         ],
        //         "continents": [
        //             "North America"
        //         ],
        //         "flags": {
        //             "png": "https://flagcdn.com/w320/jm.png",
        //             "svg": "https://flagcdn.com/jm.svg",
        //             "alt": "The flag of Jamaica is divided by a gold diagonal cross into four alternating triangular areas of green at the top and bottom, and black on the hoist and fly sides"
        //         },
        //         "coatOfArms": {
        //             "png": "https://mainfacts.com/media/images/coats_of_arms/jm.png",
        //             "svg": "https://mainfacts.com/media/images/coats_of_arms/jm.svg"
        //         },
        //         "startOfWeek": "monday",
        //         "capitalInfo": {
        //             "latlng": [
        //                 17.99702,
        //                 -76.79358
        //             ]
        //         }
        //     },
        //     {
        //         "name": {
        //             "common": "United Kingdom",
        //             "official": "United Kingdom of Great Britain and Northern Ireland",
        //             "nativeName": {
        //                 "eng": {
        //                     "official": "United Kingdom of Great Britain and Northern Ireland",
        //                     "common": "United Kingdom"
        //                 }
        //             }
        //         },
        //         "tld": [
        //             ".uk"
        //         ],
        //         "cca2": "GB",
        //         "ccn3": "826",
        //         "cca3": "GBR",
        //         "cioc": "GBR",
        //         "independent": true,
        //         "status": "officially-assigned",
        //         "unMember": true,
        //         "currencies": {
        //             "GBP": {
        //                 "name": "British pound",
        //                 "symbol": "£"
        //             }
        //         },
        //         "idd": {
        //             "root": "+4",
        //             "suffixes": [
        //                 "4"
        //             ]
        //         },
        //         "capital": [
        //             "London"
        //         ],
        //         "altSpellings": [
        //             "GB",
        //             "UK",
        //             "Great Britain"
        //         ],
        //         "region": "Europe",
        //         "subregion": "Northern Europe",
        //         "languages": {
        //             "eng": "English"
        //         },
        //         "translations": {
        //             "ara": {
        //                 "official": "??????? ??????? ????????? ?????? ???????? ????????",
        //                 "common": "??????? ???????"
        //             },
        //             "bre": {
        //                 "official": "Rouantelezh-Unanet Breizh-Veur ha Norzhiwerzhon",
        //                 "common": "Rouantelezh-Unanet"
        //             },
        //             "ces": {
        //                 "official": "Spojené království Velké Británie a Severního Irska",
        //                 "common": "Spojené království"
        //             },
        //             "cym": {
        //                 "official": "United Kingdom of Great Britain and Northern Ireland",
        //                 "common": "United Kingdom"
        //             },
        //             "deu": {
        //                 "official": "Vereinigtes Königreich Großbritannien und Nordirland",
        //                 "common": "Vereinigtes Königreich"
        //             },
        //             "est": {
        //                 "official": "Suurbritannia ja Põhja-Iiri Ühendkuningriik",
        //                 "common": "Suurbritannia"
        //             },
        //             "fin": {
        //                 "official": "Ison-Britannian ja Pohjois-Irlannin yhdistynyt kuningaskunta",
        //                 "common": "Yhdistynyt kuningaskunta"
        //             },
        //             "fra": {
        //                 "official": "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord",
        //                 "common": "Royaume-Uni"
        //             },
        //             "hrv": {
        //                 "official": "Ujedinjeno Kraljevstvo Velike Britanije i Sjeverne Irske",
        //                 "common": "Ujedinjeno Kraljevstvo"
        //             },
        //             "hun": {
        //                 "official": "Nagy-Britannia és Észak-Írország Egyesült Királysága",
        //                 "common": "Egyesült Királyság"
        //             },
        //             "ita": {
        //                 "official": "Regno Unito di Gran Bretagna e Irlanda del Nord",
        //                 "common": "Regno Unito"
        //             },
        //             "jpn": {
        //                 "official": "????·??????????????????",
        //                 "common": "????"
        //             },
        //             "kor": {
        //                 "official": "??????? ????? ?? ??",
        //                 "common": "??"
        //             },
        //             "nld": {
        //                 "official": "Verenigd Koninkrijk van Groot-Brittannië en Noord-Ierland",
        //                 "common": "Verenigd Koninkrijk"
        //             },
        //             "per": {
        //                 "official": "??????? ???? ????????? ???? ? ?????? ?????",
        //                 "common": "??????"
        //             },
        //             "pol": {
        //                 "official": "Zjednoczone Królestwo Wielkiej Brytanii i Irlandii Pólnocnej",
        //                 "common": "Zjednoczone Królestwo"
        //             },
        //             "por": {
        //                 "official": "Reino Unido da Grã-Bretanha e Irlanda do Norte",
        //                 "common": "Reino Unido"
        //             },
        //             "rus": {
        //                 "official": "??????????? ??????????? ?????????????? ? ???????? ????????",
        //                 "common": "??????????????"
        //             },
        //             "slk": {
        //                 "official": "Spojené královstvo Velkej Británie a SevernéhoÌrska",
        //                 "common": "Velká Británia (Spojené královstvo)"
        //             },
        //             "spa": {
        //                 "official": "Reino Unido de Gran Bretaña e Irlanda del Norte",
        //                 "common": "Reino Unido"
        //             },
        //             "srp": {
        //                 "official": "????????? ?????????? ?????? ????????? ? ??????? ?????",
        //                 "common": "????????? ??????????"
        //             },
        //             "swe": {
        //                 "official": "Förenade konungariket Storbritannien och Nordirland",
        //                 "common": "Storbritannien"
        //             },
        //             "tur": {
        //                 "official": "Büyük Britanya ve Kuzey Irlanda Birlesik Kralligi",
        //                 "common": "Birlesik Krallik"
        //             },
        //             "urd": {
        //                 "official": "?????? ????? ??????? ???? ? ????? ???????",
        //                 "common": "?????? ?????"
        //             },
        //             "zho": {
        //                 "official": "?????????????",
        //                 "common": "??"
        //             }
        //         },
        //         "latlng": [
        //             54,
        //             -2
        //         ],
        //         "landlocked": false,
        //         "borders": [
        //             "IRL"
        //         ],
        //         "area": 242900,
        //         "demonyms": {
        //             "eng": {
        //                 "f": "British",
        //                 "m": "British"
        //             },
        //             "fra": {
        //                 "f": "Britannique",
        //                 "m": "Britannique"
        //             }
        //         },
        //         "flag": "????",
        //         "maps": {
        //             "googleMaps": "https://goo.gl/maps/FoDtc3UKMkFsXAjHA",
        //             "openStreetMaps": "https://www.openstreetmap.org/relation/62149"
        //         },
        //         "population": 67215293,
        //         "gini": {
        //             "2017": 35.1
        //         },
        //         "car": {
        //             "signs": [
        //                 "GB"
        //             ],
        //             "side": "left"
        //         },
        //         "timezones": [
        //             "UTC-08:00",
        //             "UTC-05:00",
        //             "UTC-04:00",
        //             "UTC-03:00",
        //             "UTC-02:00",
        //             "UTC",
        //             "UTC+01:00",
        //             "UTC+02:00",
        //             "UTC+06:00"
        //         ],
        //         "continents": [
        //             "Europe"
        //         ],
        //         "flags": {
        //             "png": "https://flagcdn.com/w320/gb.png",
        //             "svg": "https://flagcdn.com/gb.svg",
        //             "alt": "The flag of the United Kingdom — the Union Jack — has a blue field. It features the white-edged red cross of Saint George superimposed on the diagonal red cross of Saint Patrick which is superimposed on the diagonal white cross of Saint Andrew."
        //         },
        //         "coatOfArms": {
        //             "png": "https://mainfacts.com/media/images/coats_of_arms/gb.png",
        //             "svg": "https://mainfacts.com/media/images/coats_of_arms/gb.svg"
        //         },
        //         "startOfWeek": "monday",
        //         "capitalInfo": {
        //             "latlng": [
        //                 51.5,
        //                 -0.08
        //             ]
        //         },
        //         "postalCode": {
        //             "format": "@# #@@|@## #@@|@@# #@@|@@## #@@|@#@ #@@|@@#@ #@@|GIR0AA",
        //             "regex": "^(([A-Z]\\d{2}[A-Z]{2})|([A-Z]\\d{3}[A-Z]{2})|([A-Z]{2}\\d{2}[A-Z]{2})|([A-Z]{2}\\d{3}[A-Z]{2})|([A-Z]\\d[A-Z]\\d[A-Z]{2})|([A-Z]{2}\\d[A-Z]\\d[A-Z]{2})|(GIR0AA))$"
        //         }
        //     },
        //     {
        //         "name": {
        //             "common": "United States",
        //             "official": "United States of America",
        //             "nativeName": {
        //                 "eng": {
        //                     "official": "United States of America",
        //                     "common": "United States"
        //                 }
        //             }
        //         },
        //         "tld": [
        //             ".us"
        //         ],
        //         "cca2": "US",
        //         "ccn3": "840",
        //         "cca3": "USA",
        //         "cioc": "USA",
        //         "independent": true,
        //         "status": "officially-assigned",
        //         "unMember": true,
        //         "currencies": {
        //             "USD": {
        //                 "name": "United States dollar",
        //                 "symbol": "$"
        //             }
        //         },
        //         "idd": {
        //             "root": "+1",
        //             "suffixes": [
        //                 "201",
        //                 "202",
        //                 "203",
        //                 "205",
        //                 "206",
        //                 "207",
        //                 "208",
        //                 "209",
        //                 "210",
        //                 "212",
        //                 "213",
        //                 "214",
        //                 "215",
        //                 "216",
        //                 "217",
        //                 "218",
        //                 "219",
        //                 "220",
        //                 "224",
        //                 "225",
        //                 "227",
        //                 "228",
        //                 "229",
        //                 "231",
        //                 "234",
        //                 "239",
        //                 "240",
        //                 "248",
        //                 "251",
        //                 "252",
        //                 "253",
        //                 "254",
        //                 "256",
        //                 "260",
        //                 "262",
        //                 "267",
        //                 "269",
        //                 "270",
        //                 "272",
        //                 "274",
        //                 "276",
        //                 "281",
        //                 "283",
        //                 "301",
        //                 "302",
        //                 "303",
        //                 "304",
        //                 "305",
        //                 "307",
        //                 "308",
        //                 "309",
        //                 "310",
        //                 "312",
        //                 "313",
        //                 "314",
        //                 "315",
        //                 "316",
        //                 "317",
        //                 "318",
        //                 "319",
        //                 "320",
        //                 "321",
        //                 "323",
        //                 "325",
        //                 "327",
        //                 "330",
        //                 "331",
        //                 "334",
        //                 "336",
        //                 "337",
        //                 "339",
        //                 "346",
        //                 "347",
        //                 "351",
        //                 "352",
        //                 "360",
        //                 "361",
        //                 "364",
        //                 "380",
        //                 "385",
        //                 "386",
        //                 "401",
        //                 "402",
        //                 "404",
        //                 "405",
        //                 "406",
        //                 "407",
        //                 "408",
        //                 "409",
        //                 "410",
        //                 "412",
        //                 "413",
        //                 "414",
        //                 "415",
        //                 "417",
        //                 "419",
        //                 "423",
        //                 "424",
        //                 "425",
        //                 "430",
        //                 "432",
        //                 "434",
        //                 "435",
        //                 "440",
        //                 "442",
        //                 "443",
        //                 "447",
        //                 "458",
        //                 "463",
        //                 "464",
        //                 "469",
        //                 "470",
        //                 "475",
        //                 "478",
        //                 "479",
        //                 "480",
        //                 "484",
        //                 "501",
        //                 "502",
        //                 "503",
        //                 "504",
        //                 "505",
        //                 "507",
        //                 "508",
        //                 "509",
        //                 "510",
        //                 "512",
        //                 "513",
        //                 "515",
        //                 "516",
        //                 "517",
        //                 "518",
        //                 "520",
        //                 "530",
        //                 "531",
        //                 "534",
        //                 "539",
        //                 "540",
        //                 "541",
        //                 "551",
        //                 "559",
        //                 "561",
        //                 "562",
        //                 "563",
        //                 "564",
        //                 "567",
        //                 "570",
        //                 "571",
        //                 "573",
        //                 "574",
        //                 "575",
        //                 "580",
        //                 "585",
        //                 "586",
        //                 "601",
        //                 "602",
        //                 "603",
        //                 "605",
        //                 "606",
        //                 "607",
        //                 "608",
        //                 "609",
        //                 "610",
        //                 "612",
        //                 "614",
        //                 "615",
        //                 "616",
        //                 "617",
        //                 "618",
        //                 "619",
        //                 "620",
        //                 "623",
        //                 "626",
        //                 "628",
        //                 "629",
        //                 "630",
        //                 "631",
        //                 "636",
        //                 "641",
        //                 "646",
        //                 "650",
        //                 "651",
        //                 "657",
        //                 "660",
        //                 "661",
        //                 "662",
        //                 "667",
        //                 "669",
        //                 "678",
        //                 "681",
        //                 "682",
        //                 "701",
        //                 "702",
        //                 "703",
        //                 "704",
        //                 "706",
        //                 "707",
        //                 "708",
        //                 "712",
        //                 "713",
        //                 "714",
        //                 "715",
        //                 "716",
        //                 "717",
        //                 "718",
        //                 "719",
        //                 "720",
        //                 "724",
        //                 "725",
        //                 "727",
        //                 "730",
        //                 "731",
        //                 "732",
        //                 "734",
        //                 "737",
        //                 "740",
        //                 "743",
        //                 "747",
        //                 "754",
        //                 "757",
        //                 "760",
        //                 "762",
        //                 "763",
        //                 "765",
        //                 "769",
        //                 "770",
        //                 "772",
        //                 "773",
        //                 "774",
        //                 "775",
        //                 "779",
        //                 "781",
        //                 "785",
        //                 "786",
        //                 "801",
        //                 "802",
        //                 "803",
        //                 "804",
        //                 "805",
        //                 "806",
        //                 "808",
        //                 "810",
        //                 "812",
        //                 "813",
        //                 "814",
        //                 "815",
        //                 "816",
        //                 "817",
        //                 "818",
        //                 "828",
        //                 "830",
        //                 "831",
        //                 "832",
        //                 "843",
        //                 "845",
        //                 "847",
        //                 "848",
        //                 "850",
        //                 "854",
        //                 "856",
        //                 "857",
        //                 "858",
        //                 "859",
        //                 "860",
        //                 "862",
        //                 "863",
        //                 "864",
        //                 "865",
        //                 "870",
        //                 "872",
        //                 "878",
        //                 "901",
        //                 "903",
        //                 "904",
        //                 "906",
        //                 "907",
        //                 "908",
        //                 "909",
        //                 "910",
        //                 "912",
        //                 "913",
        //                 "914",
        //                 "915",
        //                 "916",
        //                 "917",
        //                 "918",
        //                 "919",
        //                 "920",
        //                 "925",
        //                 "928",
        //                 "929",
        //                 "930",
        //                 "931",
        //                 "934",
        //                 "936",
        //                 "937",
        //                 "938",
        //                 "940",
        //                 "941",
        //                 "947",
        //                 "949",
        //                 "951",
        //                 "952",
        //                 "954",
        //                 "956",
        //                 "959",
        //                 "970",
        //                 "971",
        //                 "972",
        //                 "973",
        //                 "975",
        //                 "978",
        //                 "979",
        //                 "980",
        //                 "984",
        //                 "985",
        //                 "989"
        //             ]
        //         },
        //         "capital": [
        //             "Washington, D.C."
        //         ],
        //         "altSpellings": [
        //             "US",
        //             "USA",
        //             "United States of America"
        //         ],
        //         "region": "Americas",
        //         "subregion": "North America",
        //         "languages": {
        //             "eng": "English"
        //         },
        //         "translations": {
        //             "ara": {
        //                 "official": "???????? ??????? ?????????",
        //                 "common": "???????? ???????"
        //             },
        //             "bre": {
        //                 "official": "Stadoù-Unanet Amerika",
        //                 "common": "Stadoù-Unanet"
        //             },
        //             "ces": {
        //                 "official": "Spojené státy americké",
        //                 "common": "Spojené státy"
        //             },
        //             "cym": {
        //                 "official": "United States of America",
        //                 "common": "United States"
        //             },
        //             "deu": {
        //                 "official": "Vereinigte Staaten von Amerika",
        //                 "common": "Vereinigte Staaten"
        //             },
        //             "est": {
        //                 "official": "Ameerika Ühendriigid",
        //                 "common": "Ameerika Ühendriigid"
        //             },
        //             "fin": {
        //                 "official": "Amerikan yhdysvallat",
        //                 "common": "Yhdysvallat"
        //             },
        //             "fra": {
        //                 "official": "Les états-unis d'Amérique",
        //                 "common": "États-Unis"
        //             },
        //             "hrv": {
        //                 "official": "Sjedinjene Države Amerike",
        //                 "common": "Sjedinjene Americke Države"
        //             },
        //             "hun": {
        //                 "official": "Amerikai Egyesült Államok",
        //                 "common": "Amerikai Egyesült Államok"
        //             },
        //             "ita": {
        //                 "official": "Stati Uniti d'America",
        //                 "common": "Stati Uniti d'America"
        //             },
        //             "jpn": {
        //                 "official": "???????",
        //                 "common": "???????"
        //             },
        //             "kor": {
        //                 "official": "???? ???",
        //                 "common": "??"
        //             },
        //             "nld": {
        //                 "official": "Verenigde Staten van Amerika",
        //                 "common": "Verenigde Staten"
        //             },
        //             "per": {
        //                 "official": "?????? ????? ??????",
        //                 "common": "?????? ????? ??????"
        //             },
        //             "pol": {
        //                 "official": "Stany Zjednoczone Ameryki",
        //                 "common": "Stany Zjednoczone"
        //             },
        //             "por": {
        //                 "official": "Estados Unidos da América",
        //                 "common": "Estados Unidos"
        //             },
        //             "rus": {
        //                 "official": "??????????? ????? ???????",
        //                 "common": "??????????? ????? ???????"
        //             },
        //             "slk": {
        //                 "official": "Spojené štáty Americké",
        //                 "common": "Spojené štáty americké"
        //             },
        //             "spa": {
        //                 "official": "Estados Unidos de América",
        //                 "common": "Estados Unidos"
        //             },
        //             "srp": {
        //                 "official": "????????? ???????? ??????",
        //                 "common": "????????? ???????? ??????"
        //             },
        //             "swe": {
        //                 "official": "Amerikas förenta stater",
        //                 "common": "USA"
        //             },
        //             "tur": {
        //                 "official": "Amerika Birlesik Devletleri",
        //                 "common": "Amerika Birlesik Devletleri"
        //             },
        //             "urd": {
        //                 "official": "????????? ????? ??????",
        //                 "common": "????????? ?????"
        //             },
        //             "zho": {
        //                 "official": "??????",
        //                 "common": "??"
        //             }
        //         },
        //         "latlng": [
        //             38,
        //             -97
        //         ],
        //         "landlocked": false,
        //         "borders": [
        //             "CAN",
        //             "MEX"
        //         ],
        //         "area": 9372610,
        //         "demonyms": {
        //             "eng": {
        //                 "f": "American",
        //                 "m": "American"
        //             },
        //             "fra": {
        //                 "f": "Américaine",
        //                 "m": "Américain"
        //             }
        //         },
        //         "flag": "????",
        //         "maps": {
        //             "googleMaps": "https://goo.gl/maps/e8M246zY4BSjkjAv6",
        //             "openStreetMaps": "https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8"
        //         },
        //         "population": 329484123,
        //         "gini": {
        //             "2018": 41.4
        //         },
        //         "fifa": "USA",
        //         "car": {
        //             "signs": [
        //                 "USA"
        //             ],
        //             "side": "right"
        //         },
        //         "timezones": [
        //             "UTC-12:00",
        //             "UTC-11:00",
        //             "UTC-10:00",
        //             "UTC-09:00",
        //             "UTC-08:00",
        //             "UTC-07:00",
        //             "UTC-06:00",
        //             "UTC-05:00",
        //             "UTC-04:00",
        //             "UTC+10:00",
        //             "UTC+12:00"
        //         ],
        //         "continents": [
        //             "North America"
        //         ],
        //         "flags": {
        //             "png": "https://flagcdn.com/w320/us.png",
        //             "svg": "https://flagcdn.com/us.svg",
        //             "alt": "The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton."
        //         },
        //         "coatOfArms": {
        //             "png": "https://mainfacts.com/media/images/coats_of_arms/us.png",
        //             "svg": "https://mainfacts.com/media/images/coats_of_arms/us.svg"
        //         },
        //         "startOfWeek": "sunday",
        //         "capitalInfo": {
        //             "latlng": [
        //                 38.89,
        //                 -77.05
        //             ]
        //         },
        //         "postalCode": {
        //             "format": "#####-####",
        //             "regex": "^\\d{5}(-\\d{4})?$"
        //         }
        //     },
        //     {
        //         "name": {
        //             "common": "India",
        //             "official": "Republic of India",
        //             "nativeName": {
        //                 "eng": {
        //                     "official": "Republic of India",
        //                     "common": "India"
        //                 },
        //                 "hin": {
        //                     "official": "???? ???????",
        //                     "common": "????"
        //                 },
        //                 "tam": {
        //                     "official": "???????? ????????",
        //                     "common": "???????"
        //                 }
        //             }
        //         },
        //         "tld": [
        //             ".in"
        //         ],
        //         "cca2": "IN",
        //         "ccn3": "356",
        //         "cca3": "IND",
        //         "cioc": "IND",
        //         "independent": true,
        //         "status": "officially-assigned",
        //         "unMember": true,
        //         "currencies": {
        //             "INR": {
        //                 "name": "Indian rupee",
        //                 "symbol": "?"
        //             }
        //         },
        //         "idd": {
        //             "root": "+9",
        //             "suffixes": [
        //                 "1"
        //             ]
        //         },
        //         "capital": [
        //             "New Delhi"
        //         ],
        //         "altSpellings": [
        //             "IN",
        //             "Bharat",
        //             "Republic of India",
        //             "Bharat Ganrajya",
        //             "???????"
        //         ],
        //         "region": "Asia",
        //         "subregion": "Southern Asia",
        //         "languages": {
        //             "eng": "English",
        //             "hin": "Hindi",
        //             "tam": "Tamil"
        //         },
        //         "translations": {
        //             "ara": {
        //                 "official": "??????? ?????",
        //                 "common": "?????"
        //             },
        //             "bre": {
        //                 "official": "Republik India",
        //                 "common": "India"
        //             },
        //             "ces": {
        //                 "official": "Indická republika",
        //                 "common": "Indie"
        //             },
        //             "cym": {
        //                 "official": "Republic of India",
        //                 "common": "India"
        //             },
        //             "deu": {
        //                 "official": "Republik Indien",
        //                 "common": "Indien"
        //             },
        //             "est": {
        //                 "official": "India Vabariik",
        //                 "common": "India"
        //             },
        //             "fin": {
        //                 "official": "Intian tasavalta",
        //                 "common": "Intia"
        //             },
        //             "fra": {
        //                 "official": "République de l'Inde",
        //                 "common": "Inde"
        //             },
        //             "hrv": {
        //                 "official": "Republika Indija",
        //                 "common": "Indija"
        //             },
        //             "hun": {
        //                 "official": "Indiai Köztársaság",
        //                 "common": "India"
        //             },
        //             "ita": {
        //                 "official": "Repubblica dell'India",
        //                 "common": "India"
        //             },
        //             "jpn": {
        //                 "official": "??????",
        //                 "common": "???"
        //             },
        //             "kor": {
        //                 "official": "?? ???",
        //                 "common": "??"
        //             },
        //             "nld": {
        //                 "official": "Republiek India",
        //                 "common": "India"
        //             },
        //             "per": {
        //                 "official": "?????? ????????",
        //                 "common": "???"
        //             },
        //             "pol": {
        //                 "official": "Republika Indii",
        //                 "common": "Indie"
        //             },
        //             "por": {
        //                 "official": "República da Índia",
        //                 "common": "Índia"
        //             },
        //             "rus": {
        //                 "official": "?????????? ?????",
        //                 "common": "?????"
        //             },
        //             "slk": {
        //                 "official": "Indická republika",
        //                 "common": "India"
        //             },
        //             "spa": {
        //                 "official": "República de la India",
        //                 "common": "India"
        //             },
        //             "srp": {
        //                 "official": "????????? ??????",
        //                 "common": "??????"
        //             },
        //             "swe": {
        //                 "official": "Republiken Indien",
        //                 "common": "Indien"
        //             },
        //             "tur": {
        //                 "official": "Hindistan Cumhuriyeti",
        //                 "common": "Hindistan"
        //             },
        //             "urd": {
        //                 "official": "??????? ?????",
        //                 "common": "?????"
        //             },
        //             "zho": {
        //                 "official": "?????",
        //                 "common": "??"
        //             }
        //         },
        //         "latlng": [
        //             20,
        //             77
        //         ],
        //         "landlocked": false,
        //         "borders": [
        //             "BGD",
        //             "BTN",
        //             "MMR",
        //             "CHN",
        //             "NPL",
        //             "PAK"
        //         ],
        //         "area": 3287590,
        //         "demonyms": {
        //             "eng": {
        //                 "f": "Indian",
        //                 "m": "Indian"
        //             },
        //             "fra": {
        //                 "f": "Indienne",
        //                 "m": "Indien"
        //             }
        //         },
        //         "flag": "????",
        //         "maps": {
        //             "googleMaps": "https://goo.gl/maps/WSk3fLwG4vtPQetp7",
        //             "openStreetMaps": "https://www.openstreetmap.org/relation/304716"
        //         },
        //         "population": 1380004385,
        //         "gini": {
        //             "2011": 35.7
        //         },
        //         "fifa": "IND",
        //         "car": {
        //             "signs": [
        //                 "IND"
        //             ],
        //             "side": "left"
        //         },
        //         "timezones": [
        //             "UTC+05:30"
        //         ],
        //         "continents": [
        //             "Asia"
        //         ],
        //         "flags": {
        //             "png": "https://flagcdn.com/w320/in.png",
        //             "svg": "https://flagcdn.com/in.svg",
        //             "alt": "The flag of India is composed of three equal horizontal bands of saffron, white and green. A navy blue wheel with twenty-four spokes — the Ashoka Chakra — is centered in the white band."
        //         },
        //         "coatOfArms": {
        //             "png": "https://mainfacts.com/media/images/coats_of_arms/in.png",
        //             "svg": "https://mainfacts.com/media/images/coats_of_arms/in.svg"
        //         },
        //         "startOfWeek": "monday",
        //         "capitalInfo": {
        //             "latlng": [
        //                 28.6,
        //                 77.2
        //             ]
        //         },
        //         "postalCode": {
        //             "format": "######",
        //             "regex": "^(\\d{6})$"
        //         }
        //     }
        // ]
        // // const data = response.json()
        // const countriesToDisplay = response.filter(country => {
        //     return ['India', 'Canada', 'Jamaica', 'United Kingdom', 'United States'].includes(country.name.common);
        // });
        // const formattedData = countriesToDisplay.map(country => ({
        //     name: country.name.common,
        //     flag: country.flags.png
        // }));
        // this.setState({ countries: formattedData });



    }





    async initializeLanguages() {

        const { countryCode, agentProfile } = this.props;
        const regex = /^([^\/]+)/;
        const userLanguagePreference = agentProfile.department ? agentProfile.department : `en-${agentProfile.countryCode}/English`;
        const currentLanguageCode = userLanguagePreference.match(regex)[1];
        const backupLanguage = `en-${agentProfile.countryCode}`

        const LangCode = currentLanguageCode.includes(countryCode) ? currentLanguageCode : backupLanguage;


        const context = require.context('../../resources', true, /\.json$/);
        const keys = context.keys();

        const cstr = `/${countryCode}/(.*\\.json)`;
        const regexPattern = new RegExp(cstr);

        // Test the regex pattern
        const filteredKeys = [LangCode]


        const languagePromises = filteredKeys.map(async (key) => {
            const code = filteredKeys[0];

            // Return a promise that resolves with the name and code
            return new Promise(async (resolve, reject) => {
                try {
                    const module = await import('../../resources/' + countryCode + '/' + code + '.json');
                    const name = module.selectionName;
                    resolve({ name, code });
                } catch (error) {
                    reject(error);
                }
            });
        });

        // Resolve all promises using Promise.all and update the state
        await Promise.all(languagePromises)
            .then(languages => {
                this.props.initialize({
                    languages,
                    options: {
                        renderToStaticMarkup,
                        renderInnerHtml: true,

                    }
                });
            })
            .catch(error => {
                console.error("Error initializing languages:", error);
            })
        await this.addTranslationsForActiveLanguage()
    }


    async componentDidUpdate(prevProps) {

        const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
        const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
        const hasLanguageChanged = prevLangCode !== curLangCode;
        if (hasLanguageChanged) {
            await this.addTranslationsForActiveLanguage();
        }

    }
    async addTranslationsForActiveLanguage() {
        const { activeLanguage, setActiveLanguage } = this.props;
        const regex = /^([^\/]+)/;
        const userLanguagePreference = this.props.agentProfile.department ? this.props.agentProfile.department : `en-${this.props.agentProfile.countryCode}/English`;
        let currrentLanguageCode = userLanguagePreference.match(regex)[1];

        if (!activeLanguage) {

            setActiveLanguage(`en-${this.props.agentProfile.countryCode}/English`);
            return;
        }

        try {
            const translations = await import(`../../resources/${this.props.countryCode}/${currrentLanguageCode}.json`);
            this.props.addTranslationForLanguage(translations, currrentLanguageCode);
        } catch (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
                currrentLanguageCode = `en-${this.props.agentProfile.countryCode}`;
                try {
                    const translations = await import(`../../resources/${this.props.countryCode}/${currrentLanguageCode}.json`);
                    this.props.addTranslationForLanguage(translations, currrentLanguageCode);
                } catch (fallbackError) {
                    console.error('Error while importing fallback translations:', fallbackError);
                }
            } else {
                console.error('Error while importing translations:', error);
            }
        }
    }
    getClass(languageCode, activeLanguage) {
        return languageCode === activeLanguage.code ? 'active' : ''
    }


    // -------------------------------------------------------------------------------------------------------------------------------------------

    // selectCountry = (country) => {


    //     let sampleIP;
    //     switch (country) {
    //         case 'India':
    //             sampleIP = '203.129.216.230';
    //             break;
    //         case 'Canada':
    //             sampleIP = '142.114.192.0';
    //             break;
    //         // case 'Jamaica':
    //         //     sampleIP = '67.230.79.255';
    //         //     break;
    //         // case 'United Kingdom':
    //         //     sampleIP = '51.148.63.20';
    //         //     break;
    //         // case 'United States':
    //         //     sampleIP = '45.56.66.139';
    //         //     break;
    //         // case 'Ireland':
    //         //     sampleIP = '101.46.176.0';
    //         //     break;
    //         default:
    //             sampleIP = 'No sample IP available';
    //     }
    //     cookie.save("remoteIPAddress", sampleIP, { domain: ".spotify.com" });

    //     this.setState({ showCountrySelect: false, refreshReq: true })

    // }

    // -------------------------------------------------------------------------------------------------------------------------------------------


    render() {

        const { languages, activeLanguage, setActiveLanguage, agentProfile, countryCode, app } = this.props;
        // return (<>
        //     {/* // null */}
        //     {/* // ------------------------------------------------------------------------------------------------------------------------------------------- */}
        //     <Modal
        //         open={this.state.showCountrySelect}
        //         footer={null}
        //     >
        //         {<div>
        //             <h1>List of Countries</h1>
        //             <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        //                 {this.state.countries
        //                     .filter(country => !['United Kingdom', 'United States', 'Jamaica'].includes(country.name))
        //                     .map(country => (
        //                         <div key={country.name} style={{ width: '50%', marginBottom: '10px' }}>
        //                             <button
        //                                 style={{
        //                                     padding: '10px',
        //                                     border: '1px solid #ccc',
        //                                     borderRadius: '5px',
        //                                     display: 'flex',
        //                                     alignItems: 'center'
        //                                 }}
        //                                 onClick={() => this.selectCountry(country.name)}
        //                             >
        //                                 <img
        //                                     src={country.flag}
        //                                     alt={`${country.name} flag`}
        //                                     style={{ width: '30px', marginRight: '10px' }}
        //                                 />
        //                                 <span>{country.name}</span>
        //                             </button>
        //                         </div>
        //                     ))}
        //                 {this.state.countries
        //                     .filter(country => ['United Kingdom', 'United States', 'Jamaica'].includes(country.name))
        //                     .map(country => (
        //                         <div key={country.name} style={{ width: '50%', marginBottom: '10px' }}>
        //                             <button
        //                                 style={{
        //                                     padding: '10px',
        //                                     border: '1px solid #ccc',
        //                                     borderRadius: '5px',
        //                                     display: 'flex',
        //                                     alignItems: 'center',
        //                                     backgroundColor: 'lightgray',
        //                                     cursor: 'not-allowed'
        //                                 }}
        //                                 disabled
        //                             >
        //                                 <img
        //                                     src={country.flag}
        //                                     alt={`${country.name} flag`}
        //                                     style={{ width: '30px', marginRight: '10px' }}
        //                                 />
        //                                 <span>{country.name}</span>
        //                             </button>
        //                         </div>
        //                     ))}
        //             </div>
        //         </div>
        //         }
        //     </Modal>
        //     <Modal
        //         open={this.state.refreshReq}
        //         footer={null}
        //     >
        //         <div style={{ textAlign: 'center' }}>
        //             <Result
        //                 status="404"
        //                 title="Your country preference is saved!"
        //                 extra={
        //                     <Button
        //                         style={{
        //                             padding: '10px',
        //                             border: '1px solid #039298',
        //                             borderRadius: '5px',
        //                             backgroundColor: '#039298',
        //                             color: 'white',
        //                             cursor: 'pointer'
        //                         }}
        //                         type='primary'
        //                         onClick={() => { window.location.reload(), this.setState({ refreshReq: false }) }}
        //                     >
        //                         Refresh Page
        //                     </Button>
        //                 }
        //             />
        //         </div>
        //     </Modal>
        // </>
        //     // -------------------------------------------------------------------------------------------------------------------------------------------
        // )
        return null
    };
}


const mapStateToProps = (state, props) => {

    const { agentProfile, app } = state;


    const agentCountryId = agentProfile.countryId;
    // const currentCountry = app.countryConfigurations ? app.countryConfigurations.countryCode : undefined;
    return { agentProfile, agentCountryId, app }
}

export default withLocalize(withRouter(connect(
    mapStateToProps, { initializeConfigurations }
)(LanguageToggle)));
