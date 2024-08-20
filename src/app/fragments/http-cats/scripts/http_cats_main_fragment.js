//@ts-check
//import styles
import "../styles/http_cats.css";

import AppFragmentBuilder from "oats-i/fragments/builder/AppFragmentBuilder";
import AppMainFragment from "oats-i/fragments/AppMainFragment"

class HTTPCatsMainFragment extends AppMainFragment{

    async initializeView(cb){

        //@ts-expect-error cannot find module (for view)
        const uiTemplate = require("../views/http_cats_fragment.hbs")();
        this.onViewInitSuccess(uiTemplate, cb);
    }
}

const httpCatsMainFragmentBuilder = new AppFragmentBuilder(HTTPCatsMainFragment, {

    localRoutingInfos: null,
    viewID: "http-cats-main-fragment",
});
export default httpCatsMainFragmentBuilder;
