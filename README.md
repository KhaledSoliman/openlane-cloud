# openlane-cloud

## Features
+ Platform independent (does not require specific cloud infrastructure)
+ User Accounts
+ User Dashboard
+ Job submission through Github repo URL
+ Job monitoring 
+ Email notifications
+ Design features extraction
+ Design space exploration through flow parameters sweeping

## Technologies planned for each requirement

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
Pubnub or similar libraries with Pub/Sub system

Email notifications -
Either dedicated email solution in house or third party service like firebase or AWS SES
