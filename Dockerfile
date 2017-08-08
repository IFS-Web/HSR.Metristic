FROM node:7-stretch

RUN apt-get update && \
	apt-get -y install git && \
	apt-get clean all && \
	rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/metristic

# Download and build source, remove dev environment & install production deps
RUN git clone --depth=1 https://github.com/IFS-Web/HSR.Metristic.Core.git && \
    cd HSR.Metristic.Core && \
	npm install --no-optional --silent && \
	npm run typings install && \
	npm run gulp deploy && \
	npm link && \
	rm -rf node_modules && \
	npm install --no-optional --silent --production

RUN git clone --depth=1 https://github.com/IFS-Web/HSR.Metristic.Plugin.General.git && \
    cd /usr/src/metristic/HSR.Metristic.Plugin.General && \
	npm link "metristic-core" && \
	npm install --no-optional --silent && \
	npm run typings install && \
	npm run gulp deploy && \
	npm link && \
	rm -rf node_modules && \
	npm link "metristic-core" && \
	npm install --no-optional --silent --production

RUN git clone --depth=1 https://github.com/IFS-Web/HSR.Metristic.Plugin.Web.git && \
    cd /usr/src/metristic/HSR.Metristic.Plugin.Web && \
	npm link "metristic-core" && \
	npm install --no-optional --silent && \
	npm run typings install && \
	npm run gulp deploy && \
	npm link && \
	rm -rf node_modules && \
	npm link "metristic-core" && \
	npm install --no-optional --silent --production

COPY . /usr/src/metristic/HSR.Metristic
RUN \
    cd /usr/src/metristic/HSR.Metristic && \
	npm link "metristic-core" && \
	npm link "metristic-plugin-general" && \
	npm link "metristic-plugin-web" && \
	npm install --no-optional --silent && \
	npm run typings install && \
	npm run gulp deploy && \
	npm link && \
	rm -rf node_modules && \
	npm link "metristic-core" && \
	npm link "metristic-plugin-general" && \
	npm link "metristic-plugin-web" && \
	npm install --no-optional --silent --production

CMD [ "node", "HSR.Metristic/app/index.js" ]
EXPOSE 8080
