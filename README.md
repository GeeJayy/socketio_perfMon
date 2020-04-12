# Socket.io Prototype for System Performance Monitor

Sample socketIO-based Performance Monitor, built following Robert Bunch's overview of socket.io version2.
    - Scaling with Node Cluster
        - N systems may join and be monitored simultaneously
    - Redis for Pub/Sub messaging to all threads

## Getting Started

- Clone/download zip. 
- Npm install *Each Folder* (nodeClient, perf-Client, server)
- In */server* => run Nodemon server.js (defaults to port 8181)
- In */nodeClient* => run Nodemon index.js (client connects to socket server)

### Prerequisites

- Node.js 
- socket.io
- express 
- nodemon
- React
- Redis
- MongoDB

### Installing

A step by step series of examples that tell you how to get a development env running

- 1:
- 2:
- 3: 
- 4: 


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Socket.io](http://socket.io/docs) - websocket/polling framework
* [Node.js](https://nodejs.org/en/) - Dependency Management
* [Redis](https://redislabs.com) - Pub/Sub for Node Cluster Management
* [React](https://reactjs.org) - Front-end Framework

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Graham Johnson** - *Initial work* - [GeeJayy](https://github.com/geejayy)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you to Robert Bunch for illuminating the inner workings and power of socket.io [RobertBunch](https://github.com/robertbunch);
