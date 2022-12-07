up:
	docker-compose up

build:
	docker-compose up --build

access:
	docker exec -it ctf-backend-1 /bin/sh 

down:
	docker-compose down

clean:
	docker rmi -f $(shell docker images -aq)
	docker rm -f $(shell docker ps -aq)
	docker ps -a
	docker images -a
