# generator-spbones

A lightweight [Yeoman](http://yeoman.io/) generator for scaffolding a classic SharePoint app workspace.

## Get Started

Install Yeoman and the SPBones generator to begin.

```sh
npm install -g yo generator-spbones
```

Once installed, you can generate a new SharePoint app workspace from any directory. The following command will create a new project folder called `my-new-app` under the current working directory.

```sh
yo spbones my-new-app
```

## Build

Each app workspace is configured with ES6 JavaScript and SASS stylesheets for modern tooling and framework support. SharePoint assets such as CSS, JavaScript, master pages, page layouts, and web parts are compiled to a `dist` folder using [Webpack](https://webpack.js.org/) for easy production deployments. Run any build command to compile your assets:

```sh
# Expanded files with source maps
npm run dev

# Run "dev" build in watch mode
npm run watch

# Compressed files, no source maps
npm run production
```

## Template Development

Place master pages and page layouts in the `src/master` and `src/layout` folders, respectively. For quick and easy template generation, check out [SPFlash](https://marketplace.visualstudio.com/items?itemName=spiritous.spflash'), a Visual Studio Code extension designed and built as a companion to this generator.

## Deployment

[SPGo](https://marketplace.visualstudio.com/items?itemName=SiteGo.spgo) is a Visual Studio Code extension designed to streamline the deployment of classic SharePoint assets to one or more SharePoint environments. This generator creates an `SPGo.json` file, which you can use in conjunction with the SPGo extension to quickly publish all assets to a target environment.
