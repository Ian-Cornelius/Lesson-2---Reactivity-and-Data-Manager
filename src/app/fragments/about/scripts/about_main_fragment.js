//@ts-check
//import styles
import "../styles/about_responsive.css";

import AppFragmentBuilder from "oats-i/fragments/builder/AppFragmentBuilder";
import AppMainFragment from "oats-i/fragments/AppMainFragment"

class AboutMainFragment extends AppMainFragment{

    async initializeView(cb){

        //@ts-expect-error cannot find module (for view)
        const uiTemplate = require("../views/about_fragment.hbs")();
        this.onViewInitSuccess(uiTemplate, cb);
    }
}

const aboutMainFragmentBuilder = new AppFragmentBuilder(AboutMainFragment, {

    localRoutingInfos: null,
    viewID: "about-main-fragment",
});

export default aboutMainFragmentBuilder;