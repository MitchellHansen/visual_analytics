# Visual Analytics

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

####Group Members
- Elliott Barcoe
  - Anthony Armatas-Brier
  - Mitchell Hansen
  - Pushkin Feleke


####Goal of Visual Analytics

  - Allows users to take tests 
  - Drag and drop files into Dillinger
  - Export documents as Markdown, HTML and PDF

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.




## Tech

####Backend:

* [Python](https://www.python.org/downloads/)
* [Flask](https://www.fullstackpython.com/flask.html)
* [MYSQL](https://dev.mysql.com/downloads/)
* [AJAX](http://www.w3schools.com/xml/ajax_intro.asp)- Request data from a server - after the page has loaded
* [Linux Server](https://www.ubuntu.com/download/ubuntu-kylin)

####Front End

* [HTML](http://www.w3schools.com/html/default.asp)-
* [css](http://www.w3schools.com/css/)- CSS describes how HTML elements should be displayed.
* [JavaScript](https://www.javascript.com/)- 
* [JQuery](https://jquery.com/)- jQuery greatly simplifies JavaScript programming.

####Comunication Tools
 
* [GitHub](www.github.com)
* [Slack](https://www.slack.com)



And of course Visual Analytics is open source with a [public repository](https://github.com/elliottbarcoewalsh/visual_analytics)
 on GitHub.

### Installation

Visual Analytics requires the following. 

Download and extract the latest release.

####Flask 

If you are on Mac OS X or Linux, chances are that the following command will work for you:

Installation of virtualenv  for Mac OSX 
```sh
$ sudo pip install virtualenv
```

Installation of virtualenv  for Ubuntu 
```sh
$ sudo pip install virtualenv
```

For production environments...

```sh
$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins

* Dropbox
* Github
* Google Drive
* OneDrive

Readmes, how to use them in your own application can be found here:

* [plugins/dropbox/README.md] [PlDb]
* [plugins/github/README.md] [PlGh]
* [plugins/googledrive/README.md] [PlGd]
* [plugins/onedrive/README.md] [PlOd]

### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma start
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
npm run-script build-docker
```
This will create the dillinger image and pull in the necessary dependencies. Moreover, this uses a _hack_ to get a more optimized `npm` build by copying the dependencies over and only installing when the `package.json` itself has changed.  Look inside the `package.json` and the `Dockerfile` for more details on how this works.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 80 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:latest
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


#### docker-compose.yml

Change the path for the nginx conf mounting path to your full path, not mine!

### N|Solid and NGINX

More details coming soon.


### Todos

 - Write Tests
 - Rethink Github Save
 - Add Code Comments
 - Add Night Mode

License
----
Computer Science Department - Central Washington University 





