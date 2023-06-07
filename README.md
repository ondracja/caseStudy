# Project install guide
1. clone the repo
2. run `yarn` in project root

# How to run tests

To open an interactive test runner with electron browser and e2e testing preselected, use `yarn cypress:open`

To run all tests in a headless mode, use `yarn cypress:run`

# About test architecture
- Tests are organised by their type to 3 suites:
    - smoke
    - regression
    - api
- in this project, I'm using the `page action` model for recycling test logic and for providing an abstraction layer. Normally, I'd have a `*Actions.js/ts` file for each app page
- project uses eslint standard configuration with cypress plugins

