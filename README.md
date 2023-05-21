# Blockchain_based_Inventory_of_Scope_3_Carbon_Emissions
![logo](https://user-images.githubusercontent.com/74814435/233967208-6be13513-f1dc-4246-9b19-5849ce11ce74.png)

## Overview
This repository contains the source code of a web-based platform called "Blockchain-based Inventory of Scope-3 Carbon Emissions". The platform is designed to simulate carbon transactions between users on the Hyperledger Fabric blockchain. It has a React frontend and a Django backend and allows users to interact with an ERC-20 smart contract deployed on chain. 

The website offers user authentication through JWT of Django Rest Framework, and then users can act as different identities on the blockchain with their own special ID as address and msp.

This project is still under development, and we welcome any suggestions for improvement. You can help us identify issues by using the "Issues" tab above. Your feedback is valuable, and we appreciate your contribution to the project's development.

## Installation
1. Clone this repository:
```bash
$ git clone https://github.com/dodo920306/Blockchain_based_Inventory_of_Scope_3_Carbon_Emissions.git
$ cd blockchain-based-inventory/website
```

2. Install frontend dependencies:
```bash
$ cd frontend
$ npm install
```

3. Install backend dependencies:
```bash
$ cd ../backend
$ pip install -r requirements.txt
```

## Usage
Due to the excessive use of absolute-path-driven programming in the current project, it is very troublesome to run it on another computer. However, we will fix this issue in the future.