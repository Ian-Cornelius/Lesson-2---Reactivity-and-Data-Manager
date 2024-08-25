//@ts-check
//import styles
import "../styles/movies.css";

import AppFragmentBuilder from "oats-i/fragments/builder/AppFragmentBuilder";
import AppMainFragment from "oats-i/fragments/AppMainFragment";
import DataManager from "oats-i/data-manager/data_manager";
import LifecycleRemoteRequestUtils from "oats-i/utils/remote-requests/lifecycle/lifecycle_remote_request_utils";

//import our config (create your own by signing up on themoviedb.org
//Tutorial: https://www.youtube.com/watch?v=FlFyrOEz2S4
//Use the access token as APIKey if having issues using API key directly.
import _CONFIG from "../../../../../secrets/config";
import ListViewManager from "oats-i/data-manager/view-managers/list/list_view_manager";

/**
 * Lesson 2
 */
/**
 * @typedef MoviesModel
 * @property {string} title
 * @property {string} release_date
 * @property {string} poster_path
 */

class MoviesMainFragment extends AppMainFragment{

    /**
     * Lesson 2
     * @param {AppMainFragmentConstructorArgs} args 
     */
    constructor(args){

        super(args);

        /**
         * @type {DataManager<MoviesModel>}
         */
        this.moviesDataManager = new DataManager({

            primaryLifeCycleObject: this.getLifeCycleObject(),
            masterAPIOptions: {

                reqUtils: new LifecycleRemoteRequestUtils(this.getLifeCycleObject())
            }
        });

        //set up the data manager
        this.setUpDataManager();

        //set up the view manager
        /**
         * @type {ListViewManager<MoviesModel, "MODEL_ROOT">} Notice the scope restriction to MODEL_ROOT only?
         */
        this.moviesViewManager = null;
        this.setUpViewManager();
    }

    setUpDataManager(){

        //set the scoped API options to load data
        this.moviesDataManager.setScopedAPIOptions("MODEL_ROOT", {

            MODEL_ROOT: {

                networkInterface: {

                    async getReqBody(reqAddr, updatedModel, mutation, completeOldModel){

                        return {

                            reqMethod: "GET",
                            reqHeaders: {
                                
                                authorization: `${_CONFIG.MoviesAPIKey}`,
                            },
                            contentType: "application/json"
                        }
                    },
                    async onDataLoadPostProcess(reqAddr, response, newData, oldData, mutation, mappedDataId, extras){

                        const finalData = JSON.parse(response).results;
                        return {

                            data: finalData,
                            response: response
                        }
                    },
                    onDataLoadError(reqAddr, response, newData, oldData, mutation){

                        return {

                            response: response
                        }
                    }
                }
            }
        });
    }

    setUpViewManager(){

        this.moviesViewManager = new ListViewManager(this.moviesDataManager, {

            scope: "MODEL_ROOT",
            id: "MoviesListViewManager",
            viewOptions: {

                parentNodeID: "movies-results",
                componentViewClass: "result"
            },
            lifecycleOptions: {

                instance: this.getLifeCycleObject()
            }
        });
        
        this.moviesViewManager.registerViewDataHooks({

            root: {

                builder: {

                    inflateRoot: (data) => {

                        return {

                            //@ts-expect-error
                            inflatedView: require("../views/new-movie/new_movie.hbs")({ ...data, poster_path: `https://image.tmdb.org/t/p/w500/${data.poster_path}`})
                        }
                    },
                    onViewAttach: (modelId, data, viewNode, mappedDataId, extras) => {


                    },
                    onViewDetach: (modelId, data, viewNode, mappedDataId, completeCb) => {


                    }
                },
                prePostRootAttachHooks: {

                    onMutate: (modelID, mutation, newData, oldData, parentNode, extras) => {

                        //show loading ui
                        //Show loading
                        //@ts-expect-error
                        parentNode.insertAdjacentHTML("beforeend", require("../../http-cats/views/loading-ui/loading_ui.hbs")({ wittyMsg: "Tree, help me find the handle!" }));
                    },
                    onCommit: (modelId, mutation, newData, oldData, parentNode, extas) => {

                        //remmove loading ui
                        parentNode.removeChild(parentNode.querySelector("#loading-ui"));
                    },
                    onCancel: (modelId, mutation, newData, oldData, parentNode, response, extras) => {

                        //remove loading ui
                        parentNode.removeChild(parentNode.querySelector("#loading-ui"));
                    },
                    onError: (modelId, mutation, data, failedData, response, parentNode, retryCb, extras) => {

                        //not used for now
                    }
                }
            }
        }, null);

        //set self as view manager for scope in data manager
        this.moviesDataManager.setViewManager("MODEL_ROOT", this.moviesViewManager, null);
    }

    async initializeView(cb){

        //@ts-expect-error cannot find module (for view)
        const uiTemplate = require("../views/movies_fragment.hbs")();
        this.onViewInitSuccess(uiTemplate, cb);
    }

    /**
     * Lesson 2
     * @type {AppMainFragment['onUIBind']}
     */
    onUIBind(isServerSide){

        //set up listeners
        document.getElementById("movie-form").addEventListener("submit", this.getMovie.bind(this));
        document.getElementById("find-movie").addEventListener("click", this.getMovie.bind(this));
    }

    /**
     * 
     * @param {Event} e 
     */
    getMovie(e){

        e.preventDefault();
        //@
        const title = document.getElementById("movie-search").value;
        if(title){

            if(this.moviesDataManager.hasData()){

                this.moviesDataManager.flushAllData();
            }

            this.moviesDataManager.loadData("MODEL_ROOT", null, {}, null, `/api/movies/${title}`).catch((err) => {


            });
        }
    }
}

const moviesMainFragmentBuilder = new AppFragmentBuilder(MoviesMainFragment, {

    localRoutingInfos: null,
    viewID: "movies-main-fragment",
});

export default moviesMainFragmentBuilder;