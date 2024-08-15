# Full-Stack Application Deployment and Management on Kubernetes

## Step 1: Setup the Kubernetes Environment

Start Minikube
```minikube start --memory 4096 --cpus 4```

Verify kubectl is configured correctly
```kubectl get nodes```

Create a Namespace
```kubectl create namespace fullstack-app```

## Step 2: Containerize the Application

Build and push the Docker image to Docker Hub<br>
Frontend<br>
```docker build -t kusalthiwanka/frontend-nginx:latest ./frontend```<br>
```docker push kusalthiwanka/frontend-nginx:latest```<br>
Backend<br>
```docker build -t kusalthiwanka/backend-node:latest ./backend```<br>
```docker push kusalthiwanka/backend-node:latest```<br>

## Step 3: Create Kubernetes Manifests 

Apply the Persistent Volume and Claim<br>
```kubectl apply -f k8s/mongo-pv.yaml```<br>

Apply the ConfigMap<br>
```kubectl apply -f k8s/configmap.yaml```<br>

Apply the Secret (Include the MongoDB credentials)<br>
```kubectl apply -f k8s/secret.yaml```<br>

Deploy MongoDB<br>
```kubectl apply -f k8s/mongo-deployment.yaml```<br>

Deploy Node.js Backend<br>
```kubectl apply -f k8s/backend-deployment.yaml```<br>

Deploy Nginx Frontend<br>
```kubectl apply -f k8s/nginx-deployment.yaml```<br>

## Step 4: Application Management

Scale the deployments if needed<br>
```kubectl scale --replicas=3 deployment/backend -n fullstack-app```<br>
```kubectl scale --replicas=3 deployment/frontend -n fullstack-app```<br>

Monitoring<br>
```kubectl apply -f mongo-deployment.yaml```<br>

Port Forwarding for local Access<br>
```kubectl port-forward svc/mongo 27017:27017 -n fullstack-app```<br>

Use Mongo shell to interact with your database<br>
```mongo --host localhost --port 27017 -u <username> -p <password>```<br>

Perform rolling updates<br>
```kubectl set image deployment/backend backend=your-dockerhub-username/backend-node:new-version -n fullstack-app```<br>
