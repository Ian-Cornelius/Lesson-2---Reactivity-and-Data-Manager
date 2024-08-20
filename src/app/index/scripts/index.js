//@ts-check
import AppStateManager from "oats-i/base-history/app_state_manager";
import appRoot from "oats-i/bin/app_root"
import AppRoutingInfo from "./routing-info/app_routing_info";
import MainRouter from "oats-i/router/main_router";
import AppMainNavInfo from "./routing-info/app_main_nav_info";

//import styles
import "../styles/index.css";

function initApp(){

    const appStateManager = new AppStateManager(AppRoutingInfo);
    appRoot.initApp(appStateManager, new MainRouter(AppRoutingInfo, appStateManager, (args) => {}, "", async (url) => {

        return {

            canAccess: true,
            fallbackRoute: "/"
        }
    }), { template: null, mainNavInfos: AppMainNavInfo }, "");
}

initApp();