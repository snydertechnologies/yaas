<p align="center" style="font-size: 1.25em;">
    <span style="font-size: 1.25em;"><strong>Y</strong></span><span style="color: #a0a0a0;">et</span>
    <span style="font-size: 1.25em;"><strong>A</strong></span><span style="color: #a0a0a0;">nother</span>
    <span style="font-size: 1.25em;"><strong>C</strong></span><span style="color: #a0a0a0;">apital</span>
    <span style="font-size: 1.25em;"><strong>S</strong></span><span style="color: #a0a0a0;">ystem</span>
    <hr>
</p>

# Credit Where Credit Is Due
All the hard work and credit for the logic of the project goes to the maintainer and contributors of the original BigCapital project. This fork is being done to help encourage the upstream BigCapital project to modernize the tooling and development experience.

# Why Fork BigCapital?
The key reasons this repo exists are:
- As of May 2024, the BigCapital repo is struggling to be typesafe. The project started as plain JS and is rolling out into production SaaS while severe typesafety problems are still present. Features are being piled on, but the codebase has serious issues and needs to be refactored. So ... why not rip-and-replace all the stuff that's causing problems with "better stuff" 🕺
- I wanted to _replace_ [Prettier](https://prettier.io/) and [Eslint](https://eslint.org/) with tools like [BiomeJS](https://biomejs.dev/) and [OXC](https://oxc-project.github.io/).
- I wanted to remove [Lerna](https://lerna.js.org/) and make better use of [Nx](https://nx.dev/)
- I wanted replace [Knex.js](https://knexjs.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- I wanted first-class support for [PostgreSQL](https://www.postgresql.org/) w/ [schemas](https://www.postgresql.org/docs/current/ddl-schemas.html) instead of separate MySQL instances.
- I wanted to build the system around my own needs, while also making our improvements available to others

# Feature Pairity w/ Upstream
- We use the [`upstream/develop`](https://github.com/snydertechnologies/yacs/tree/upstream/develop) branch to sync with [BigCapital](https://github.com/bigcapitalhq/bigcapital)'s [`develop`](https://github.com/bigcapitalhq/bigcapital/tree/develop) branch
- When we've ported functionality from upstream, we'll update [`upstream/migrated-to-yaas`](https://github.com/snydertechnologies/yacs/tree/upstream/migrated-to-yaas) and document this README

# Current state of things
  - Initial installer isn't executing the "Job" that makes the tenant database. Working to fix this or replace the existing job approach with something Drizzle can do. For now, you can seed using BigCapital repo, then after the tenant database is created, you can run this `server`.
  - Vite frontend works for `webapp`
  - Bun backend works for `server`, and compiled to [single-file executables](https://bun.sh/docs/bundler/executables)
  - The `website` has been copied and I plan to update it, paying homage to the original BigCapital and referring people there. This project doesn't ain to take bread from the mouths of the original maintainers, but to help them modernize the project.

# Coming soon
- [Snyder Tech](https://snyder.tech) will be donating infrastructure and developer time to help maintain this project on an ongoing basis, making it easy for others to get involved.
- [Keycloak](https://www.keycloak.org/), [Zitadel](https://zitadel.com/) and generic [OIDC](https://en.wikipedia.org/wiki/OpenID#OpenID_Connect_.28OIDC.29) support for authentication and multi-org support to be a focal point of the project

<br>
<hr><hr><hr>
<br>
<p align="center">
  <p align="center">
    <a href="https://bigcapital.app" target="_blank">
      <img src="https://raw.githubusercontent.com/abouolia/blog/main/public/bigcapital.svg" alt="Bigcapital" width="280" height="75">
    </a>
  </p>
  <p align="center">
    Simple, smart online accounting software for small and medium businesses.
  </p>

  <p align="center">
    <a href="https://github.com/bigcapitalhq/bigcapital/commits/develop">
      <img src="https://img.shields.io/github/commit-activity/m/bigcapitalhq/bigcapital/develop" />
    </a>
    <a href="https://discord.com/invite/c8nPBJafeb">
      <img src="https://img.shields.io/discord/1066514716752625725?label=Discord" alt="" />
    </a>
    <a href="https://github.com/bigcapitalhq/bigcapital/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/bigcapitalhq/bigcapital" alt="" />
    </a>
    <a href="https://github.com/bigcapitalhq/bigcapital/blob/develop/LICENSE">
      <img src="https://img.shields.io/github/license/bigcapitalhq/bigcapital" alt="" />
    </a>
    <a href="https://twitter.com/bigcapitalhq"> 
      <img src="https://img.shields.io/twitter/follow/bigcapitalhq?style=social" alt="twitter" />
    </a>
  </p>

  <p align="center">
    <a href="https://my.bigcapital.app">Bigcapital Cloud</a>
  </p>
</p>

# What's Bigcapital?

Bigcapital is a smart and open-source accounting and inventory software, Bigcapital keeps all business finances in right place and automates accounting processes to give the business powerful and intelligent financial statements and reports to help in making decisions.

<p align="center">
  <img src="https://raw.githubusercontent.com/abouolia/blog/main/public/screenshot-2.png" width="270">
  <img src="https://raw.githubusercontent.com/abouolia/blog/main/public/screenshot-1.png" width="270">
  <img src="https://raw.githubusercontent.com/abouolia/blog/main/public/screenshot-3.png" width="270">
</p>

# Getting Started

We've got serveral options on dev and prod depending on your need to get started quickly with Bigcapital.

## Self-hosted 

Bigcapital is available open-source under AGPL license. You can host it on your own servers using Docker.

### Docker

To get started with self-hosted with Docker and Docker Compose, take a look at the [Docker guide](https://docs.bigcapital.app/deployment/docker).

## Development

### Local Setup

To get started locally, we have a [guide to help you](https://github.com/bigcapitalhq/bigcapital/blob/develop/CONTRIBUTING.md).

### Gitpod

- Click the Gitpod button below to open this project in development mode.
- This will open and configure the workspace in your browser with all the necessary dependencies.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/new/#https://github.com/bigcapitalhq/bigcapital)

## Headless Accounting

You can integrate Bigcapital API with your system to organize your transactions in double-entry system to get the best financial reports.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/bigcapital/workspace/bigcapital-api)

# Resources

- [Documentation](https://docs.bigcapital.app/) - Learn how to use.
- [Contribution](https://github.com/bigcapitalhq/bigcapital/blob/develop/CONTRIBUTING.md) - Welcome to any contributions.
- [Discord](https://discord.com/invite/c8nPBJafeb) - Ask for help.
- [Bug Tracker](https://github.com/bigcapitalhq/bigcapital/issues) - Notify us new bugs.

# Changelog

Please see [Releases](https://github.com/bigcapitalhq/bigcapital/releases) for more information what has changed recently.

# Contact us

Meet our sales team for any commercial inquiries.

<a target="_blank" href="https://cal.com/ahmed-bouhuolia-ekk3ph/30min"><img src="https://cal.com/book-with-cal-dark.svg" alt="Book us with Cal.com"></a>

# Recognition

<a href="https://news.ycombinator.com/item?id=36118990">
  <img
    style="width: 250px; height: 54px;" width="250" height="54"
    alt="Featured on Hacker News"
    src="https://hackernews-badge.vercel.app/api?id=36118990"
  />
</a>

# Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abouolia"><img src="https://avatars.githubusercontent.com/u/2197422?v=4?s=100" width="100px;" alt="Ahmed Bouhuolia"/><br /><sub><b>Ahmed Bouhuolia</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=abouolia" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://ameir.net"><img src="https://avatars.githubusercontent.com/u/374330?v=4?s=100" width="100px;" alt="Ameir Abdeldayem"/><br /><sub><b>Ameir Abdeldayem</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/issues?q=author%3Aameir" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/elforjani13"><img src="https://avatars.githubusercontent.com/u/39470382?v=4?s=100" width="100px;" alt="ElforJani13"/><br /><sub><b>ElforJani13</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=elforjani13" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://scheibling.se"><img src="https://avatars.githubusercontent.com/u/24367830?v=4?s=100" width="100px;" alt="Lars Scheibling"/><br /><sub><b>Lars Scheibling</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/issues?q=author%3Ascheibling" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/suhaibaffan"><img src="https://avatars.githubusercontent.com/u/18115937?v=4?s=100" width="100px;" alt="Suhaib Affan"/><br /><sub><b>Suhaib Affan</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=suhaibaffan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KalliopiPliogka"><img src="https://avatars.githubusercontent.com/u/81677549?v=4?s=100" width="100px;" alt="Kalliopi Pliogka"/><br /><sub><b>Kalliopi Pliogka</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/issues?q=author%3AKalliopiPliogka" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://me.kochie.io"><img src="https://avatars.githubusercontent.com/u/10809884?v=4?s=100" width="100px;" alt="Robert Koch"/><br /><sub><b>Robert Koch</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=kochie" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://cschuijt.nl"><img src="https://avatars.githubusercontent.com/u/5460015?v=4?s=100" width="100px;" alt="Casper Schuijt"/><br /><sub><b>Casper Schuijt</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/issues?q=author%3Acschuijt" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ANasouf"><img src="https://avatars.githubusercontent.com/u/19536487?v=4?s=100" width="100px;" alt="ANasouf"/><br /><sub><b>ANasouf</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=ANasouf" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ragnarlaud.dev"><img src="https://avatars.githubusercontent.com/u/3042904?v=4?s=100" width="100px;" alt="Ragnar Laud"/><br /><sub><b>Ragnar Laud</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/issues?q=author%3Axprnio" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/asenawritescode"><img src="https://avatars.githubusercontent.com/u/67445192?v=4?s=100" width="100px;" alt="Asena"/><br /><sub><b>Asena</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/issues?q=author%3Aasenawritescode" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://snyder.tech"><img src="https://avatars.githubusercontent.com/u/707567?v=4?s=100" width="100px;" alt="Ben Snyder"/><br /><sub><b>Ben Snyder</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=benpsnyder" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://vederis.id"><img src="https://avatars.githubusercontent.com/u/13505006?v=4?s=100" width="100px;" alt="Vederis Leunardus"/><br /><sub><b>Vederis Leunardus</b></sub></a><br /><a href="https://github.com/bigcapitalhq/bigcapital/commits?author=cloudsbird" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
