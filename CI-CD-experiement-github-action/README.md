# CI/CD Pipeline Configurations

`CI` is stand for `Continues Integration`
`CD` is stand for `Continues Delivery`

some other terms also there like `Continues Deployment`,

anyway in this repo im going to configure `CI/CD` with `Github actions`
![CI/CD](https://wpblog.semaphoreci.com/wp-content/uploads/2022/05/cicd-pipeline-introduction-1024x422-1.jpg)

Github Actions CI
For this implementation im using github actions so for basic configuration read following reference for `yml` file configuration for job

> https://docs.github.com/en/actions/quickstart

following in the step you need to follow to create `.yml` actions file, such as :-

> Create a `.github/workflows` directory in your repository on GitHub if this directory does not already exist.

> In the `.github/workflows directory`, create a file named `github-actions-demo.yml`. For more information, see `Creating new files.`

> Copy the following YAML contents into the github-actions-demo.yml file:

``` yml
name: Client and Server - CI
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  build:
    env:
      CI: true
      MONGO_URL: mongodb://localhost/clientservrDB
    strategy:
      matrix:
        node-version: [14.x, 16.x]
        mongodb-version: ['4.4']
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js version ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: Use MongoDB from GitHub actions
        uses: supercharge/mongodb-github-action@1.6.0
        with:
          mongodb-version: ${{ matrix.mongodb-version }}
      - run: npm install
      - run: npm run build --prefix client
      - run: npm test
```

you can see in above `.yml` file `use: supercharge/mongodb-github-action@1.6.6` those are action and required. you can search those on `Github market` refer below link for more details

> https://github.com/marketplace/actions/mongodb-for-github-actions
![Github Actions list in github market](https://i.ibb.co/sJqbJpd/06-08-2022-17-42-57-REC.png)

once you are make configuration in your `.yml` file and pushed then github start auto build process, following is screenshot we can see once all the build and test get passed

![github build success ](https://i.ibb.co/xGSTCwH/build-done-github.png)