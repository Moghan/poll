# Udacity - Cloud DevOps Engineer - Capstone Project

In this project you will apply the skills and knowledge which were developed throughout the Cloud DevOps Nanodegree program. These include:

* Working in AWS
* Using Jenkins to implement Continuous Integration and Continuous Deployment
* Building pipelines
* Working with Ansible and CloudFormation to deploy clusters
* Building Kubernetes clusters
* Building Docker containers in pipelines

## Getting started

* Clone the repo
* Log in to an AWS account with rights to manage clusters.

## Decissions

Struggled a bit creating and taking down clusters. For simplicity I decided to keep the same cluster between blue and green deployments, creating new resources within the cluster and taking down the old resources at every blue/green deployment.