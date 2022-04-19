# Welcome to Keploy UI 👋

<p style="text-align:center;" align="center">
  <img align="center" src="https://avatars.githubusercontent.com/u/92252339?s=200&v=4" width="30%" />
</p>

[![Slack](https://img.shields.io/badge/slack-@keyploy--slack-yellow.svg)](https://join.slack.com/t/keploy/shared_invite/zt-12rfbvc01-o54cOG0X1G6eVJTuI_orSA)
[![Github](https://img.shields.io/badge/github-@keyploy--github-9cf.svg)](https://github.com/keploy)
[![LinkedIN](https://img.shields.io/badge/linkedin-@keyploy--LinkedIn-lightgray.svg)](https://www.linkedin.com/company/keploy/)
[![YouTube](https://img.shields.io/badge/youtube-@keyploy--youtube-red.svg)](https://www.youtube.com/channel/UC6OTg7F4o0WkmNtSoob34lg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen?logo=github)](CODE_OF_CONDUCT.md)
[![License](.github/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


# About Us
Keploy is a no-code API testing platform.

Keploy automatically generates unit test cases with dependency mocks from API calls

Developers can use keploy alongside their favorite unit testing framework to save time writing testcases.

## How it works?

![How it works](https://raw.githubusercontent.com/keploy/docs/main/static/img/how-it-works.png)

**Note:** You can generate test cases from **any environment** which has all the infrastructure dependencies setup. Please consider using this to generate tests from low-traffic environments first. The deduplication feature necessary for high-traffic environments is currently experimental.

## Installation

This is the UI repository of Keploy platform. Please follow [QuickStar/Installation guide](https://github.com/keploy/keploy.git).

## Contribution

Make sure you're using **Node version 14.16.0**

### 1. Start the Keploy Server
There's a separate [docker-compose](docker-compose-dev.yaml) file which helps which exposes the mongo server and also builds the dockerfile from local code.  The `build` flag ensures that the binary is built again to reflect the latest code changes. There's also [docker-compose-debug.yaml](docker-compose-debug.yaml) which can help remote debugging the go server on port 4000.
```shell
git clone https://github.com/keploy/keploy.git && cd keploy
docker-compose -f docker-compose-dev.yaml up --build
```
### 2. Start the Keploy Console/UI
```shell
git clone https://github.com/keploy/ui.git && cd ui
npm i 
```
For development, we'll add the API URL as local keploy server url running at http://localhost:8081
```shell
export GATSBY_API_URL=http://localhost:8081/api
```

Now let's start the Gatsby Server 

```shell
npm run develop
```

If you make some UI/design changes and want to add test data. In the new directory, clone test data repo : 
```shell
git clone https://github.com/keploy/test-data.git && cd test-data
```
Within test-data directory

#### Install mongo-database-tools
```
brew tap mongodb/brew
brew install mongodb-database-tools
```
#### Restore DB
```
mongorestore  dump/
```
You should now be able to see test data on the UI.

## Community support
We'd love to collaborate with you to make Keploy great. To get started feel free to reach out to us :
* [Slack](https://join.slack.com/t/keploy/shared_invite/zt-12rfbvc01-o54cOG0X1G6eVJTuI_orSA) - Discussions with the community and the team.
* [GitHub](https://github.com/keploy/keploy/issues) - For bug reports and feature requests.

## 📌 Our valuable Contributors👩‍💻👨‍💻 :
<table>
  <tr>
    <a href="https://github.com/keploy/ui/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=keploy/ui" />
    </a>
  </tr>
</table>
