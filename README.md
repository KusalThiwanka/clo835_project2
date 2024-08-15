# Full-Stack Application Deployment and Management on Kubernetes

## Step 1: Setup the Kubernetes Environment

Start Minikube
```minikube start --memory 4096 --cpus 4```

Verify kubectl is configured correctly
```kubectl get nodes```

Create a Namespace
```kubectl create namespace fullstack-app```

## Step 2: Containerize the Application

Build and push the Docker image to Docker Hub
Frontend
```docker build -t kusalthiwanka/frontend-nginx:latest ./frontend```
```docker push kusalthiwanka/frontend-nginx:latest```
Backend
```docker build -t kusalthiwanka/backend-node:latest ./backend```
```docker push kusalthiwanka/backend-node:latest```

## Step 3: Create Kubernetes Manifests 

Apply the Persistent Volume and Claim
```kubectl apply -f k8s/mongo-pv.yaml```

Apply the ConfigMap
```kubectl apply -f k8s/configmap.yaml```

Apply the Secret (Include the MongoDB credentials)
```kubectl apply -f k8s/secret.yaml```

Deploy MongoDB
```kubectl apply -f mongo-deployment.yaml```

Deploy Node.js Backend
```kubectl apply -f backend-deployment.yaml```

Deploy Nginx Frontend
```kubectl apply -f nginx-deployment.yaml```

## Step 4: Application Management

Scale the deployments if needed
```kubectl scale --replicas=3 deployment/backend -n fullstack-app```
```kubectl scale --replicas=3 deployment/frontend -n fullstack-app```

Monitoring
```kubectl apply -f mongo-deployment.yaml```

Port Forwarding for local Access
```kubectl port-forward svc/mongo 27017:27017 -n fullstack-app```

Use Mongo shell to interact with your database
```mongo --host localhost --port 27017 -u <username> -p <password>```

Perform rolling updates
```kubectl set image deployment/backend backend=your-dockerhub-username/backend-node:new-version -n fullstack-app```


