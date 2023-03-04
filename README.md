<a name="readme-top"></a>

<div align="center">

[![GitHub][github-shield]][github-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Gmail][gmail-shield]][gmail-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://potential-clients-tracker.herokuapp.com/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Potential Clients Tracker</h3>

  <p align="center">
    This web application will act as a Customer Relationship Management (CRM) Tool
customized to a specific adult day healthcare center. The tool helps the staff to track the
potential customers to answer questions like “what marketing channel is this customer
from”, “what step is this customer currently at in the enrollment process”, “when should I
follow up on this customer”, “what the conversion rate is for the social media channel”, and
so on to help the staff to connect with the customers easily and convert them to
customers smoothly.
    <br />
    <a href="https://potential-clients-tracker.herokuapp.com/"><strong>View Demo »</strong></a>
    <br />
    <br />
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br />
<!-- ABOUT THE PROJECT -->

## About The Project

![App Login Screenshot][login-screenshot]

![App Homepage Screenshot][homepage-screenshot]

Currently, there are lots of CRM tools in the market but none of them is purposefully
designed for adult day healthcare centers, which has a slightly unique conversion process
than other businesses. Also, Although digital marketing can target more audiences in a large area, due to the targeted audience of adult daycare centers, traditional marketing channels, such as newspapers, direct mail, radio, and so on, still remain effective.

The main users of this tracker are more than 50 years old and more insensitive to newer technologies. They lean on tools that are easy to learn and use, have a straightforward and clear user interface, and can improve their work efficiency.

Therefore, tracking potential clients in a specific adult day healthcare center to map their
user journey and measure the conversion rates and improve the work efficiency with a
simple user interface and straightforward user interactions are the main goals of this
application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Node][node.js]][node-url]
- [![Express][express.js]][express-url]
- [![JavaScript][js]][js-url]
- [![React][react.js]][react-url]
- [![React Router][react-router.js]][react-router-url]
- [![Postgresql][pg.sql]][pg-url]
- [![Material-UI][mui]][mui-url]
- [![Axios][axios]][axios-url]
- [![NPM][npm.js]][npm-url]
- [![JSONWEBTOKEN][jsonwebtoken]][jsonwebtoken-url]
- [![JQuery][jquery.com]][jquery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:iamchenyu/potential-clients-tracker-app.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

3. Start the server

   ```sh
   cd backend
   node server.js
   ```

4. Start the project

   ```sh
   cd frontend
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Browser the DEMO by registering a new user or using the login information below:

```sh
 Email:
 admin@test.com (for admin access)
 editor@test.com (for editor access)
 viewer@test.com (for viewer access)

 password: password
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Features

- [x] User Registration & Login
- [x] Review & Edit clients' information
- [x] Review & Update clients' status
- [x] Review & Update clients' status
- [x] Add a new client
- [x] Map clients' journey
- [ ] Future Features
  - [x] Sort & Filter clients based on user needs
  - [ ] Group clients based on different categories, such as marketing channels and status and generate analysis charts
  - [x] Allow users to comment on each client for the updates
  - [ ] Email notifications to users

See the [open issues](https://github.com/iamchenyu/potential-clients-tracker-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Chenyu Wang - hellochenyuw@gmail.com

Project Link: [https://github.com/iamchenyu/potential-clients-tracker-app](https://github.com/iamchenyu/potential-clients-tracker-app/issues)

Try it out: https://potential-clients-tracker.herokuapp.com/ (Heroku App)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[github-shield]: https://img.shields.io/badge/-github-black.svg?style=for-the-badge&logo=github&colorB=555
[github-url]: https://github.com/iamchenyu
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[gmail-shield]: https://img.shields.io/badge/-gmail-black.svg?style=for-the-badge&logo=gmail&colorB=555
[gmail-url]: mailto:hellochenyuw@gmail.com
[login-screenshot]: images/login.png
[homepage-screenshot]: images/homepage.png
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[react-router.js]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://reactrouter.com/en/main
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[pg.sql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[pg-url]: https://www.postgresql.org/
[mui]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[mui-url]: https://mui.com/
[jsonwebtoken]: https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink
[jsonwebtoken-url]: https://jwt.io/
[axios]: https://img.shields.io/badge/AXIOS-purple?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
[npm.js]: https://img.shields.io/badge/npm-CC3534?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/
[js]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[js-url]: https://www.javascript.com/
