//@ts-check
import MainNavigationInfoBuilder from "oats-i/router/utils/nav-info/main_nav_info_builder";

const AppMainNavInfo = MainNavigationInfoBuilder.buildMainNavigationInfo([

    {
        selector: "home-link",
        defaultRoute: "/",
        baseActiveRoute: "/",
    },
    {
        selector: "about-link",
        defaultRoute: "/about",
        baseActiveRoute: "/about",
    }
]);

export default AppMainNavInfo;