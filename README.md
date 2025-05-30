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
        run: npm ci

      - name: Run Cypress tests
        run: npm run test

      - name: Generate Allure Report
        run: |
          npm run report
        continue-on-error: true

      - name: Upload Allure report artifact
        uses: actions/upload-artifact@v3
        with:
          name: allure-report
          path: allure-report
```
###
This YAML configuration defines a GitHub Actions workflow named "Cypress CI with Allure." The workflow is triggered automatically whenever code is pushed to the main branch of the repository. Its primary purpose is to automate the process of running Cypress end-to-end tests and generating an Allure test report.

The workflow consists of a single job called "cypress-run," which executes on the latest Ubuntu runner provided by GitHub. The job is broken down into several steps. First, it checks out the repository code using the official checkout action. Next, it sets up a Node.js environment with version 18, ensuring compatibility with the project's dependencies.

After setting up Node.js, the workflow installs all project dependencies using the npm ci command, which is optimized for continuous integration environments. It then runs the Cypress test suite by executing npm run test. Once the tests complete, the workflow attempts to generate an Allure report by running npm run report. The continue-on-error: true option allows the workflow to proceed even if report generation fails, preventing the entire job from failing due to reporting issues.

Finally, the workflow uploads the generated Allure report as an artifact named "allure-report." This makes the report available for download and review directly from the GitHub Actions interface, providing valuable feedback on test results for each push to the main branch.