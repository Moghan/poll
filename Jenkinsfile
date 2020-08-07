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
                script {
                    GIT_COMMIT_HASH = sh (script: "git rev-parse --short HEAD", returnStdout: true)
                    withCredentials([usernamePassword(credentialsId: 'dockerCreds', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                        sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                        // def customImage = docker.build("ybsnek/poll:${GIT_COMMIT_HASH}") // THIS DONT WORK! 
                        // + docker build -t ****/poll:d22b84a
                        //    "docker build" requires exactly 1 argument.
                        sh "docker build -t ybsnek/poll ."
                        sh "docker push ybsnek/poll"
                        
                        //customImage.push('latest')
                    }
                }
            }
        }
        stage('Deploy green') {
            when {
                branch 'green'
            }
            steps {
                withAWS(region:'eu-north-1',credentials:'JenkinsAWS') {
                    sh 'aws sts get-caller-identity'
                    sh "aws eks update-kubeconfig --name my-prod-3"
                    sh 'kubectl get svc'
                    sh 'kubectl apply -f ./k8s/poll-service-green.yaml'
                    sh 'kubectl apply -f ./k8s/load-balancer-green-yaml'
                }
            }
        }
        stage('Deploy blue') {
            when {
                branch 'blue'
            }
            steps {
                withAWS(region:'eu-north-1',credentials:'JenkinsAWS') {
                    sh 'aws sts get-caller-identity'
                    sh "aws eks update-kubeconfig --name my-prod-3"
                    sh 'kubectl get svc'
                    sh 'kubectl apply -f ./k8s/poll-service-blue.yaml'
                    sh 'kubectl apply -f ./k8s/load-balancer-blue-yaml'
                }
            }
        }
         //stage('Upload to AWS') {
         //     steps {
         //         withAWS(region:'eu-north-1',credentials:'JenkinsAWS') {
         //         sh 'echo "Uploading content with AWS creds"'
         //             s3Upload(pathStyleAccessEnabled: true, payloadSigningEnabled: true, bucket:'poll.ybsnek.com', workingDir:'build', includePathPattern:'**/*')
         //         }
         //     }
         //}
    }
}