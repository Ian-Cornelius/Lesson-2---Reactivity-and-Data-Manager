//@ts-check
const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
//Using the managed-http-proxy-lib to handle requests
const HttpProxy = require("managed-http-proxy");

const DevServerMiddlewareConfig = (middlewares, devServer) => {

    /**
     * @type {import("express").Application}
     */
    const app = devServer.app;

    //Configure the view engine
    app.set("views", path.resolve(__dirname, "../dist/views"));
    app.set("view engine", "hbs");
    app.engine("hbs", hbs.engine({

        extname: "hbs",
        layoutsDir: path.resolve(__dirname, "../dist/views"),
        partialsDir: path.resolve(__dirname, "../dist/views/partials")
    }));

    //for json
    app.use(express.json());
    //I think params and queries
    app.use(express.urlencoded({ extended: false }));
    //static
    app.use(express.static(path.resolve(__dirname, "../dist/public")));

    //My middlewares

    //Handle CORS issues with cats API
    const catsServerId = HttpProxy.createProxyServer({

        target: "https://http.cat",
        changeOrigin: true
    });
    //cats
    app.get("/api/cats/:statusCode", (req, res, next) => {

       res.locals[HttpProxy._DYNAMIC_TARGET_OVERRIDE] = `/${req.params.statusCode}`;
       next();
    }, HttpProxy.getServerMiddleware(catsServerId, "GET", "/api/cats/:statusCode", {

        //@ts-expect-error
        request: {

            options: {

                ignorePath: true
            }
        }
    }));
    //movies
    //Handle CORS issues with movies API
    const moviesServerId = HttpProxy.createProxyServer({

        target: "https://api.themoviedb.org/3/search",
        changeOrigin: true
    });
    app.get("/api/movies/:title", (req, res, next) => {

       res.locals[HttpProxy._DYNAMIC_TARGET_OVERRIDE] = `/movie?query=${req.params.title}`;
       next();
    }, HttpProxy.getServerMiddleware(moviesServerId, "GET", "/api/movies/:title", {

        //@ts-expect-error
        request: {

            options: {

                ignorePath: true
            }
        }
    }));

    //Capture all
    app.get("/*", (req, res, next) => {

        res.render("home", {
            layout: "home"
        });
    });

    return middlewares;
}

module.exports = DevServerMiddlewareConfig;