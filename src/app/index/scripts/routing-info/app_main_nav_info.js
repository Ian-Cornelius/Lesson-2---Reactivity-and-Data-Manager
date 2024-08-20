//@ts-check
import MainNavigationInfoBuilder from "oats-i/router/utils/nav-info/main_nav_info_builder";

const AppMainNavInfo = MainNavigationInfoBuilder.buildMainNavigationInfo([

    {
        selector: "http-cats-link",
        defaultRoute: "/",
        baseActiveRoute: "/",
    },
    {
        selector: "movies-link",
        defaultRoute: "/movies",
        baseActiveRoute: "/movies",
    }
]);

export default AppMainNavInfo;