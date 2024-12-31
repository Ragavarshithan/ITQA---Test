API Test Cases: https://docs.google.com/document/d/1NpLGc2eJULQrOlAihdjNLX3dHYIrrYygUr6wQwKHus8/edit?usp=sharing

UI Test Cases: https://docs.google.com/spreadsheets/d/1WMQbPysdCL3n2KGjzNAh3GtEe1Qyg90o86lt98OB8ak/edit?usp=sharing

Postman Collection: https://app.getpostman.com/join-team?invite_code=ccde52892ce8aaaa72c605a51dcb60c884d8632a9a4160c74214bac554110b1a&target_code=7a99467388655d973bfbb4a6eb64d21f

# Repository Setup and Workflow

This document provides instructions for setting up the repository, running tests, and contributing changes. Follow the steps carefully to ensure proper workflow and compliance with branch protection rules.

---

### Cloning the Repository

To start working with the repository, execute the following commands:

    git clone https://github.com/ITQA-B20/itqa.git
    cd itqa
    npm install


### Run the Tests
To execute the tests using Cypress, run:

    npx cypress open 


## Contribution Guidelines

### Branch Protection Rules

Direct pushes to the `main` branch are **`restricted`**. All changes must be made through branches and merged into the `main` branch via pull requests.

### Steps for Contributing Changes

1.  **Create a New Branch**  
    Use the following command to create a branch for a feature or bug fix with a descriptive name:
    `git checkout -b <newBranchName>` 
    
2.  **Push the New Branch**  
    Push the branch to the remote repository using:
    `git push origin <newBranchName>` 
    
3.  **Create a Pull Request**  
    Open a pull request on GitHub to merge the branch into the `main` branch. Ensure the following:
    -   All required tests pass.

----------