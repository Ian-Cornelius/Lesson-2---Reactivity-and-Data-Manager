//@ts-check
import RoutingInfoUtils from "oats-i/router/utils/routing-info/routing_info_utils";
import AppMainNavInfo from "./app_main_nav_info";
import httpCatsMainFragmentBuilder from "../../../fragments/http-cats/scripts/http_cats_main_fragment";
import moviesMainFragmentBuilder from "../../../fragments/movies/scripts/movies_main_fragment";

const AppRoutingInfo = RoutingInfoUtils.buildMainRoutingInfo([

    {
        route: "/",
        target: httpCatsMainFragmentBuilder,
        nestedChildFragments: null
    },
    {
        route: "/movies",
        target: moviesMainFragmentBuilder,
        nestedChildFragments: null
    }
], AppMainNavInfo);

export default AppRoutingInfo;