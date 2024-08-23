//@ts-check
//import styles
import "../styles/http_cats.css";

import AppFragmentBuilder from "oats-i/fragments/builder/AppFragmentBuilder";
import AppMainFragment from "oats-i/fragments/AppMainFragment";
import DataManager from "oats-i/data-manager/data_manager";
import LifecycleRemoteRequestUtils from "oats-i/utils/remote-requests/lifecycle/lifecycle_remote_request_utils";
import StandardViewManager from "oats-i/data-manager/view-managers/standard/standard_view_manager";
import RandomNumberCharGenUtils from "oats-i/utils/random-number-generator/random_number_char_generator";

/**
 * Lesson 2
 */

/**
 * @typedef HTTPCatsModel
 * @property {string} img
 */

class HTTPCatsMainFragment extends AppMainFragment{

    /**
     * Lesson 2
     */
    constructor(args){

        super(args);

        //set up list of random codes
        this.randomCodesList = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 214, 226, 
                                300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406,
                                407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422,
                                423, 424, 425, 426, 428, 429, 431, 444, 450, 451, 497, 498, 499, 500, 501,
                                502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599];

        //create data manager instance
        /**
         * @type {DataManager<HTTPCatsModel>}
         */
        this.httpCatsDataManager = new DataManager({

            primaryLifeCycleObject: this.getLifeCycleObject(),
            masterAPIOptions: {

                reqUtils: new LifecycleRemoteRequestUtils(this.getLifeCycleObject())
            }
        });

        //set up the data manager
        this.setUpDataManager();

        //set up the view manager
        /**
         * @type {StandardViewManager<HTTPCatsModel, "MODEL_ROOT">}
         */
        this.httpCatsStandardViewManager = null;
        this.setUpViewManager();
    }

    setUpDataManager(){

        const getDataManager = () => this.httpCatsDataManager;
        this.httpCatsDataManager.setScopedAPIOptions("MODEL_ROOT", {

            MODEL_ROOT: {

                networkInterface: {

                    async getReqBody(reqAddr, updatedModel, mutation, completeOldModel){

                        return {

                            reqMethod: "GET",
                            responseType: "blob"
                        }
                    },
                    async onDataLoadPostProcess(reqAddr, response, newData, oldData, mutation, mappedDataId, extras){

                        //create url from blob
                        const url = URL.createObjectURL(response)
                        const finalData = {};
                        getDataManager().spawnPartialShellModel("img", url, finalData, null);
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

        //create the instance
        this.httpCatsStandardViewManager = new StandardViewManager(this.httpCatsDataManager, {

            scope: "MODEL_ROOT",
            id: "HTTPCatsStandardViewManager",
            viewOptions: {

                parentNodeID: "cats-results",
                reinflateContentViewNodeID: "new-cat",
                reinflateRootViewOnNewModel: true
            },
            lifecycleOptions: {

                instance: this.getLifeCycleObject()
            }
        });

        //register hooks
        this.httpCatsStandardViewManager.registerViewDataHooks({

            root: {

                builder: {

                    inflateRoot: (data) => {

                        return {

                            inflatedView: require("../views/new-cat/new_cat.hbs")(data)
                        }
                    },
                    onViewAttach: (modelId, data, viewNode, mappedDataId, extras) => {


                    },
                    onViewDetach: (modelId, data, viewNode, mappedDataId, completeCb) => {

                        completeCb();
                    }
                },
                prePostRootAttachHooks: {

                    onMutate: (modelId, mutation, newData, oldData, parentNode, extras) => {

                        //Show loading
                        //@ts-expect-error
                        parentNode.insertAdjacentHTML("beforeend", require("../views/loading-ui/loading_ui.hbs")({ wittyMsg: "Just a meow-ment" }));
                    },
                    onCommit: (modelId, mutation, newData, oldData, parentNode, extras) => {

                        //remove loading
                        parentNode.removeChild(parentNode.querySelector("#loading-ui"));
                    },
                    onCancel: (modelId, mutation, newData, oldData, parentNode, response, extras) => {

                        //remove loading
                        parentNode.removeChild(parentNode.querySelector("#loading-ui"));
                    },
                    onError: (modelId, mutation, data, failedData, response, parentNode, retryCb, extras) => {

                        //not needed
                    }
                }
            }
        }, null);

        //set this view manager in data manager for the "MODEL_ROOT" scope
        this.httpCatsDataManager.setViewManager("MODEL_ROOT", this.httpCatsStandardViewManager, null);
    }

    async initializeView(cb){

        //@ts-expect-error cannot find module (for view)
        const uiTemplate = require("../views/http_cats_fragment.hbs")();
        this.onViewInitSuccess(uiTemplate, cb);
    }

    /**
     * Lesson 2
     */

    /**
     * @type {AppMainFragment['onUIBind']}
     */
    onUIBind(isServerSide){

        //set up click listener on "meeow" button
        document.getElementById("get-cat").addEventListener("click", (e) => {

            //clear existing data
            if(this.httpCatsDataManager.hasData()){
                
                this.httpCatsDataManager.flushAllData();
            }
            //load new random cat
            const statusCode = this.randomCodesList[RandomNumberCharGenUtils.generateRandomInteger(0, this.randomCodesList.length)];
            //move headers code to main repo. Then, finish here
            this.httpCatsDataManager.loadData("MODEL_ROOT", null, {}, null, `/api/cats/${statusCode}`).catch((err) => {

                //do this to avoid seeing the uncaught error in promise error
                //Something cool - uncomment the line below and see the error you get at times when you click on "meeow" in quick succession
                // console.error(err);
            });
        });
    }
}

const httpCatsMainFragmentBuilder = new AppFragmentBuilder(HTTPCatsMainFragment, {

    localRoutingInfos: null,
    viewID: "http-cats-main-fragment",
});
export default httpCatsMainFragmentBuilder;
