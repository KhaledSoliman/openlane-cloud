# openlane-cloud

## Description

An open source project which endeavors to automate the flow of the openlane project <Link here>, as well as providing a full solution to monitor and modify any design entry submissions.

## Features
+ Platform independent (does not require specific cloud infrastructure)
+ User Accounts
+ User Dashboard
+ Job submission through Github repo URL
+ Job monitoring 
+ Email notifications
+ Design features extraction
+ Design space exploration through flow parameters sweeping

## Architecture

### Technologies planned for each requirement

API backend:
Django or Express
Architecture: microservices

Platform independent infrastructure -
Terraform, and baremetal scripts

User Accounts - 
Either third party service like firebase or AWS cognito or in house solution

User Dashboard -
React Custom Dashboard or Kibana with elasticsearch

Job Submission - 
React interface

Job monitoring -
![Job Monitoring Sequence Diagram](https://i.imgur.com/ZlewJi1.png)
Pubnub or similar libraries with Pub/Sub system

Email notifications -
Either dedicated email solution in house or third party service like firebase or AWS SES

Design features extraction and Design space exploration through flow parameters sweeping - combination of shell/ruby scripts

Build a docker container for disposable environment

## Design Entry Repo Structure

- We intend to support a default structure at first and allow custom structures throw configurable manifests


## Team
 - Seif Shalan
 - Khaled Soliman
