# Automation-Test-Project

## Description

A project for automated testing using Cypress, with Allure reporting and CI/CD integration via GitHub Actions.

## Folder Structure

```
automation-test-project/
├── .github/
│   └── workflows/
│       └── cicd.yml              # GitHub Actions workflow
├── cypress/
│   ├── e2e/
│   │   └── practice-form-spec.cy.js  # E2E test cases
│   ├── fixtures/
│   │   └── example.json          # Test data files
│   └── support/
│       ├── command.js            # Custom commands
│       └── e2e.js                # E2E support
├── cypress.config.js             # Cypress configuration
├── package.json                  # Project scripts and dependencies
├── README.md                     # Project documentation
└── .gitignore                    # Ignored files and folders
```

## Setup

```bash
git clone https://github.com/your-username/Automation-Test-Project.git

git checkout -b [your_branch_name]

cd Automation-Test-Project
npm init
npm install
```

## Open Cypress Runner

```bash
npm run cy:open
```

## Run Tests Locally

```bash
npm run test
```

## Generate Report

```bash
npm run report
```
## Sync up remote branch
```bash
git pull origin main
git push origin main 
```
## Commit code
```bash
git add .
git commit -m "feat: commit message"
git push origin main 
```
## CI/CD Explains
```
name: Cypress CI with Allure
on:
  push:
    branches:
      - main
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Install Cypress
        run: |
          npx cypress install
          npx cypress cache list
      - name: Run Cypress tests
        run: npm run test
      - name: Generate Allure Report
        uses: simple-elf/allure-report-action@master
        if: always()
        with:
          allure_results: allure-results
          gh_pages: allure
      - name: Deploy report to Github Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: allure
          publish_dir: allure-history
```
###
This YAML configuration defines a GitHub Actions workflow named "Cypress CI with Allure." The workflow is triggered automatically whenever code is pushed to the main branch of the repository. Its primary purpose is to automate the process of running Cypress end-to-end tests and generating an Allure test report.

This GitHub Actions workflow, named "Cypress CI with Allure," is designed to automate end-to-end testing and reporting for a JavaScript project using Cypress and Allure. The workflow is triggered whenever code is pushed to the main branch.

The workflow defines a single job, "cypress-run," which runs on the latest Ubuntu environment. The job begins by checking out the repository code, then sets up Node.js version 18 to match the project's requirements. Next, it installs all project dependencies using npm install.

After dependencies are installed, Cypress is explicitly installed and its cache is listed, ensuring the test runner is ready and any caching issues are visible in the logs. The workflow then runs the project's test suite using the npm run test command.

Once tests are complete, the workflow generates an Allure report using the simple-elf/allure-report-action. The if: always() condition ensures this step runs even if previous steps fail, so test results are always processed. The Allure results are taken from the allure-results directory and published to a branch named allure.

Finally, the workflow deploys the generated Allure report to GitHub Pages using the peaceiris/actions-gh-pages action. This step also uses if: always() to guarantee execution, and it publishes the contents of the allure-history directory to the allure branch, making the test report accessible as a static website. This setup provides automated testing, reporting, and easy access to test results for every push to the main branch.