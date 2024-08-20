//@ts-check
//import styles
import "../styles/home.css";

import AppFragmentBuilder from "oats-i/fragments/builder/AppFragmentBuilder";
import AppMainFragment from "oats-i/fragments/AppMainFragment"

class HomeMainFragment extends AppMainFragment{

    async initializeView(cb){

        //@ts-expect-error cannot find module (for view)
        const uiTemplate = require("../views/home_fragment.hbs")();
        this.onViewInitSuccess(uiTemplate, cb);
    }
}

const homeMainFragmentBuilder = new AppFragmentBuilder(HomeMainFragment, {

    localRoutingInfos: null,
    viewID: "home-main-fragment",
});
export default homeMainFragmentBuilder;
