pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
        stage('Security Scan') {
              steps { 
                 aquaMicroscanner imageName: 'alpine:latest', notCompliesCmd: 'exit 1', onDisallowed: 'fail', outputFormat: 'html'
              }
         }
 
         stage('Build') {
             steps {
                checkout scm
                sh 'npm config ls'
                sh 'npm install'
                sh 'npm run build'
                
                sh 'echo "Hello World"'
                sh '''
                    echo "Multiline shell steps works too"
                    ls -lah
                '''
             }
         }
         stage('Upload to AWS') {
              steps {
                  withAWS(region:'eu-north-1',credentials:'JenkinsAWS') {
                  sh 'echo "Uploading content with AWS creds"'
                      s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, bucket:'poll.ybsnek.com', workingDir:'build', includePathPattern:'**/*')
                  }
              }
         }
     }
}