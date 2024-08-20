//@ts-check
const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

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
    //Capture all
    app.get("/*", (req, res, next) => {

        res.render("home", {
            layout: "home"
        });
    });

    return middlewares;
}

module.exports = DevServerMiddlewareConfig;