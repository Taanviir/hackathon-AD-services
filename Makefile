# Variables
DOCKER_COMPOSE = docker-compose -f ./docker-compose.yml

all: up

# Docker commands
up: build
	@$(DOCKER_COMPOSE) up -d

down:
	@$(DOCKER_COMPOSE) down

build:
	@$(DOCKER_COMPOSE) build

restart: down up

# Clear Docker containers and volumes
prune:
	@$(DOCKER_COMPOSE) down -v --remove-orphans

# Stop and remove Docker containers, networks, images, and volumes
clean: prune
	@docker system prune -f

fclean: down
	@docker system prune -af
	@docker volume ls -q | grep -q . && docker volume rm $$(docker volume ls -q) || true 

rebuild: fclean up

see_emps:
	docker exec -it app-db psql -U db_user -d hackathon_db -c "select * from employee;"

see_ors:
	docker exec -it app-db psql -U db_user -d hackathon_db -c "select * from opinion_requests;"

# Help
help:
	@echo "Makefile commands:"
	@echo "To use, run make followed by"
	@echo "  all               Build and start all services in Docker"
	@echo "  up                Start all services in Docker"
	@echo "  down              Stop all services in Docker"
	@echo "  build             Build and start containers"
	@echo "  restart           Restart all services"
	@echo "  prune             Remove containers and orphaned volumes"
	@echo "  clean             Remove all Docker data and system prune"
	@echo "  help              Show this help message"

.PHONY: all up down build restart prune clean help
