# IAC Web - Affordable Seattle

Affordable Seattle is a portal website developed jointly by The City of Seattle and Expedia.
The portal is intended to be an online information and screening tool to connect individuals and
families to City of Seattle benefit programs and services that can lower their cost of living.
The portal will support benefit seekers and the professional and informal navigators (such as
case workers and family members) who support them.
For more information, see the [City's project page](http://www.seattle.gov/innovation-advisory-council/projects/affordability-portal).

## Features

- Lists all affordability programs offered by the city.
- Includes a calculator that asks a user to input some information, and lists the programs that
  the user is qualified to apply for.

## Using this repository

### Prerequisites

- [Node JS](https://nodejs.org/en/) version 8.7.0

### How to install

- In the directory where you want the directory for this code to be created,
  `https://github.com/cityofseattle-iac/affordabilityportal.git`. The command creates a directory called `affordabilityportal`.
- `cd affordabilityportal`
- `npm install`.  This command downloads and builds all the components required to run `iac-web`. This process can take some time.

### How to run automated tests

- `npm run unittest` runs unit tests. Success or failure are indicated in the test output.

### How to run the app without Docker

- `npm run dev`. This is another process that can take a minute or two before it starts serving pages.
- By default, you can access your locally built site at `http://localhost:8443`
- To run in production mode:
    - `npm run build`
    - `npm start`

### Building and running under Docker

#### Building Docker Image
`docker build -t prod/affordabilityportal .`

#### Running App
##### Stop existing running container
`docker stop portal`

##### Delete old container
`docker rm portal`

##### Start new container
`docker run -d -p 8080:8080 -p 8443:8443 --restart unless-stopped --name portal prod/affordabilityportal`


## Technologies

- [Next JS](https://nextjs.org/)
- [React Redux](https://react-redux.js.org/)
- [Material UI](https://material-ui.com/)
- For descriptions of how this site works, see the wiki associated with this repository.

## License

See `license.txt` in this repository.

## Copyright notice

Copyright &copy; 2019 Expedia Group.
