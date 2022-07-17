# Express JS View Engine For HandleBard JS

A template engine enables you to use static template files in your application. and have a lot of features that makes your pages more dynamic.

## Express JS Template Engine List

Refer below link for express js providing tempalte engines collection

https://expressjs.com/en/resources/template-engines.html

## Install handlbars.js template engine to express

> Refer official handlbars.js repo link `https://github.com/pillarjs/hbs` for installation

install hbd package using NPM

> npm install hbs --save

Go to Express JS API reference => application and API reference and set view engine and where your view files located

### Application Settings - ExpressJS

| Property                                               | Type            | Description                                                                                                                                    | Default                  |
| ------------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| views                                                  | String or Array | A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array. | process.cwd() + '/views' |
| view engine                                            | String          | The default engine extension to use when omitted.                                                                                              |
| NOTE: Sub-apps will inherit the value of this setting. | N/A (undefined) |

Now Go to Your `server.js` and configure your template view engine and where your view files directory located

```
/** Set View Engine to NodeJS*/
app.set("view engine", "hbs");
// Set where all view files are includes
app.set("views", "views");

// serve the index.hbs once hit localhost:3000
app.get("/", (req, res) => {
  //using res.render and pass index and in the object in second Arg setting {title: "title", caption: "caption name"}
  res.render("index", {
    title: "Welcome to NodeJS",
    caption: "Hello Everyone, Welcome to NodeJS World",
  });
});

```

> After that instead of `index.html` extension update with hbs extension so the file name should named like this `index.hbs`

> Refer ExpressJS API docs `https://expressjs.com/en/5x/api.html#app.set`
