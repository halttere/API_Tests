pipeline {
    agent any

    stages {
    stage('Clonar o repositório') {
        steps {
            git branch: 'main', url: 'https://github.com/halttere/API_Tests.git'
        }
    }
    stage('Limpar cache npm') {
        steps {
            bat 'npm cache clean --force'
        }
    }
    stage('Instalar dependências') {
        steps {
            bat 'npm ci'
        }
    }
   
    stage('Executar testes') {
        steps {
            bat 'npm run cy:run'
        }
    }
}

}
