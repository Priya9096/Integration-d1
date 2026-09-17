

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

            withCredentials([usernamePassword(credentialsId: '7d4d7b53-4713-439d-8baf-ba460b6c2743',

                usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {

                sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                sh 'docker push $BACKEND:$BUILD_NUMBER'

                sh 'docker push $FRONTEND:$BUILD_NUMBER'

            }

        } }

    }

}
 