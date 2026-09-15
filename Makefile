.PHONY: build up down logs migrate superuser shell push

build:
	docker compose build
up:
	docker compose up -d --build
down:
	docker compose down
logs:
	docker compose logs -f backend
migrate:
	docker compose exec backend python manage.py migrate
superuser:
	docker compose exec backend python manage.py createsuperuser
shell:
	docker compose exec backend bash


DOCKER_ID = priyaankit
BACKEND = nxttrendz-backend
FRONTEND = nxttrendz-frontend
VERSION = v1

push:
	docker tag $(BACKEND) $(DOCKER_ID)/$(BACKEND):$(VERSION)
	docker tag $(BACKEND) $(DOCKER_ID)/$(BACKEND):latest

	docker push $(DOCKER_ID)/$(BACKEND):$(VERSION)
	docker push $(DOCKER_ID)/$(BACKEND):latest

	docker tag $(FRONTEND) $(DOCKER_ID)/$(FRONTEND):$(VERSION)
	docker tag $(FRONTEND) $(DOCKER_ID)/$(FRONTEND):latest

	docker push $(DOCKER_ID)/$(FRONTEND):$(VERSION)
	docker push $(DOCKER_ID)/$(FRONTEND):latest
