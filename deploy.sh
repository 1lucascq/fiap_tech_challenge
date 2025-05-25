echo "START"
echo "________________________________________"
echo "--> 1/4: minikube config"
echo "________________________________________"

minikube start --driver=docker
minikube addons enable ingress # utilizado para rotear o tráfego no serviço fiap-tc-service
minikube addons enable metrics-server # para o HPA funcionar corretamente
kubectl config use-context minikube
kubectl create namespace fiap-tc
kubectl config use-context minikube
echo "________________________________________"
echo "--> 2/4: config, secrets and postgree"
echo "________________________________________"

kubectl apply -f kubernetes/configmap.yml -n fiap-tc && kubectl apply -f kubernetes/secrets.yml -n fiap-tc
kubectl apply -f kubernetes/postgres/pvc.yml -n fiap-tc && kubectl apply -f kubernetes/postgres/deployment.yml -n fiap-tc && kubectl apply -f kubernetes/postgres/service.yml -n fiap-tc

echo "________________________________________"
echo "--> 3/4: db migrations"
echo "________________________________________"

kubectl apply -f kubernetes/jobs/db-migrations.yml -n fiap-tc
kubectl wait --for=condition=ready pod -l app=postgres -n fiap-tc --timeout=120s

echo "________________________________________"
echo "--> 4/4: app"
echo "________________________________________"

kubectl apply -f kubernetes/app/deployment.yml -n fiap-tc && kubectl apply -f kubernetes/app/service.yml -n fiap-tc && kubectl apply -f kubernetes/app/hpa.yml -n fiap-tc

echo "________________________________________"
echo "END"