#!/bin/bash
# Aller à la racine du projet
cd ~/MyProjects/relio

# Récupérer la dernière image depuis Docker Hub
docker pull nkoumougrinnel/relio:latest

# Relancer les services avec docker-compose
docker-compose down
docker-compose up -d
