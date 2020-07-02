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

![Top View Architecture](https://github.com/KhaledSoliman/openlane-cloud/blob/master/Top%20Level%20Architecture.png)


Platform independent infrastructure -
Terraform, and baremetal scripts

User Accounts - 
Either third party service like firebase or AWS cognito or in house solution

User Dashboard -
React Custom Dashboard or Kibana with elasticsearch

Job Submission - 
![Scheduler Sequence Diagram](https://github.com/KhaledSoliman/openlane-cloud/blob/master/Scheduler%20diagram.png)

Job monitoring - Pubnub or similar libraries with Pub/Sub system
![Job Monitoring Sequence Diagram](https://i.imgur.com/ZlewJi1.png)



Email notifications -
Either dedicated email solution in house or third party service like firebase or AWS SES

Design features extraction and Design space exploration through flow parameters sweeping - combination of shell/ruby scripts

Build a docker container for disposable environment

## Design Entry Repo Structure

- We intend to support a default structure at first and allow custom structures throw configurable manifests

## Sprint 1
- Backend
Scheduling Service
Notification Service
Dashboard Service

- Frontend
Registration and Login
Interface for job submission

## Sprint 2
 - Backend
 Resource Allocation Service
 Dashboard Service
 Job Monitoring 50%
 
 - Frontend
 Job monitoring interface
 - Job Overview
 - Console view
 
 ## Sprint 3
 - Backend
 Job monitoring done
 Dashboard Service
 Logging Service (Winston)
 
 - Frontend
Job mangement interface
Job notification features (Email, SMS, Push notification browser)
Kibana Subdashboard (Elasticsearch)

## Team
 - Seif Shalan
 - Khaled Soliman
