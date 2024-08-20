//@ts-check
//import styles
import "../styles/movies.css";

import AppFragmentBuilder from "oats-i/fragments/builder/AppFragmentBuilder";
import AppMainFragment from "oats-i/fragments/AppMainFragment"

class MoviesMainFragment extends AppMainFragment{

    async initializeView(cb){

        //@ts-expect-error cannot find module (for view)
        const uiTemplate = require("../views/movies_fragment.hbs")();
        this.onViewInitSuccess(uiTemplate, cb);
    }
}

const moviesMainFragmentBuilder = new AppFragmentBuilder(MoviesMainFragment, {

    localRoutingInfos: null,
    viewID: "movies-main-fragment",
});

export default moviesMainFragmentBuilder;