# HSR.Metristic
Node.js based checking and metric web service.

* [HSR.Metristic.Core](https://github.com/IFS-Web/HSR.Metristic.Core): Metristic web application
* [HSR.Metristic.Plugin.General](https://github.com/IFS-Web/HSR.Metristic.Plugin.General): Structure visualization and regex check plugin
* [HSR.Metristic.Plugin.Web](https://github.com/IFS-Web/HSR.Metristic.Plugin.Web): Web check plugins


## Documentation

* Project documentation: [GitHub Wiki](https://github.com/IFS-Web/HSR.Metristic/wiki)
* [All issues](https://github.com/IFS-Web/HSR.Metristic/issues), Current teration: [Open issues](https://github.com/IFS-Web/HSR.Metristic/issues?q=is%3Aopen+is%3Aissue+milestone%3A%2A+no%3Aassignee) | [In progress](https://github.com/IFS-Web/HSR.Metristic/issues?utf8=%E2%9C%93&q=is%3Aopen%20is%3Aissue%20milestone%3A*%20assignee%3A*)
* [Milestones](https://github.com/IFS-Web/HSR.Metristic/milestones)


## Lisence
![Apache License Version 2.0](https://www.apache.org/img/asf_logo.png)
[Apache License Version 2.0](./LICENSE)


## Releases / Production

⬇ Download on the [Release page](https://github.com/IFS-Web/HSR.Metristic/releases)

### Installation

* Install [node.js](https://nodejs.org/en/)
* Verify wc is available: `which wc` (used to count lines)
* Local installation: Download, link, install and deploy core & plugins like described in its documentations. Install core first, then the plugins and at least the deployment (this). For a detailed automated installation example see the steps of the [docker image](./Dockerfile).
* Download release
* Extract archive
* Enter the extracted directory, e.g. `cd Metristic-1.0`.
* Local installation: Link core & plugins: `npm link "metristic-core"; npm link "metristic-plugin-general"; npm link "metristic-plugin-web"`
* Run `npm install --production --no-optional` to install the dependencies.

### Start

* Run `node app/index.js` or `node app/index.js` (depends the release, details see release page) to start the application.
* Open `localhost:8080` in your browser.


## Development

### Global dependencies

* Node.js / npm

### Installation

* Install global dependencies (see global dependencies)
* Clone project
* Local installation: Clone & install core & plugins
* Local installation: Link core & plugins: `npm link "metristic-core"; npm link "metristic-plugin-general"; npm link "metristic-plugin-web"`
* Run `npm install --no-optional` to install the dependencies.
* Install typings depencency `npm run typings install`

### Link Metristic Core if you develop local

1. Clone Metristic Core
2. Create global link `cd Metristic.Core; sudo npm link`.
3. Add `"metristic-core": "^0.2.0",` in project.json of your deployment repository to your dependencies.
4. Run `npm link metristic-core` in your project repository.

Npm will create 2 links: `Metristic/HSR.Metristic.Plugin.General/node_modules/metristic-core -> /usr/lib/node_modules/metristic-core -> Metristic/HSR.Metristic.Core`.

"metristic-core" must match the name in project.json


### Commands

Watch files and compile TS to JS on changes:
```shell
npm run gulp watch
```
Serve app:
```shell
npm run gulp serve
# or
npm start
```
Deploy app to directory `deploy`:
```shell
npm run gulp deploy
```
Access app:
`localhost:8080`

To restart manual type `rs` and return.

Pack release (create zip archive of compiled code)
```shell
npm run pack-release
```


### Install new type declarations:
```shell
# express example
typings install express --save
# node / jasmine
typings install dt~node dt~jasmine --global --save
```


## Create your own metristic plugin

1. Create a repository like `HSR.Metristic.Plugin.General`. Don't forget main & typings field in project.json. Otherwise it will not be possible to link JS & TS.
2. If you develop localy, create a global package link: `sudo npm link`.
3. Add your repository as dependency to Metrisitc project.json. Link it if you work localy (`npm link metristic-plugin-itsname`).
4. `npm install`
5. Require and use it.


## Docker image

Docker will clone the newest stable/development source from GitHub, build from source, remove all dependencies and install only production dependencies.

action | docker | npm | docker-compose
--- | --- | ---
Build | `docker build --no-cache -t hsr/metristic/latest -f Dockerfile .` | `npm build-latest-container` | `docker-compose build`
Run | `docker run -p 8080:8080 -it --rm --name metristic-latest hsr/metristic/latest` | `or npm run run-latest-container` | `docker-compose up -d`
Stop | `docker stop metristic-latest` <br />or `npm run stop-latest-container` | `docker-compose stop`


### Manage container

https://nodejs.org/en/docs/guides/nodejs-docker-webapp/


### Run container using nginx proxy

To run the metristic-container on the deployment server using nginx proxy and letsencrypt companion do the following:

1. Pull, configure & run the nginx proxy (`jwilder/nginx-proxy:latest`) and the letsencrypt companion (`jrcs/letsencrypt-nginx-proxy-companion:latest`) if not already running
2. Pull the docker image: 

   ```shell
   docker pull instituteforsoftware/hsr.metristic:latest
   ```
3. Start the container by the following command (replace placeholders like `metristic.domain.tld` or `my-mail@domain.tld`):

   ```shell
   docker run --name metristic --restart=always \
   -e VIRTUAL_HOST=metristic.domain.tld \
   -e LETSENCRYPT_HOST=metristic.domain.tld \
   -e LETSENCRYPT_EMAIL=my-mail@domain.tld \
   -e VIRTUAL_PORT=8080 \
   instituteforsoftware/hsr.metristic:latest
   ```


## Various
https://www.airpair.com/typescript/posts/typescript-development-with-gulp-and-sublime-text
