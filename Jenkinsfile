

pipeline {

    agent any

    environment {

        DOCKER_ID  = 'priyaankit'

        BACKEND    = "${DOCKER_ID}/nxttrendz-backend"

        FRONTEND   = "${DOCKER_ID}/nxttrendz-frontend"

    }

    stages {

        stage('Checkout') { steps { git branch: 'main', url: 'https://github.com/Priya9096/Integration-d1' } }

        stage('Build') { steps {

            sh 'docker build -t $BACKEND:$BUILD_NUMBER ./backend'

            sh 'docker build -t $FRONTEND:$BUILD_NUMBER ./frontend'

        } }

        stage('Push') { steps {

            withCredentials([usernamePassword(credentialsId: 'fe77d69a-2f8e-4ca2-9f69-f7e4a07725a5',

                usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                sh 'docker push $BACKEND:$BUILD_NUMBER'

                sh 'docker push $FRONTEND:$BUILD_NUMBER'

            }

        } }

    }

}
 