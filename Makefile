# Makefile for the 'lib' directory

# Run Docker Container and rebuild
start: 
	docker compose up --build

# Stop Docker Container
stop:
	docker compose down

# Remove Docker Container
remove:
	docker compose down --rmi all

# stop and run Docker Container
restart:
	$(MAKE) stop
	$(MAKE) run

# Run Docker Container for E2E Testing
test:
	docker compose -f docker-compose.e2e.yml up --build --abort-on-container-exit
	docker compose -f docker-compose.e2e.yml down

# Purge Docker system: remove unused containers, volumes, networks, and dangling images
clean:
	docker system prune -f --volumes

start-preprod:
	docker compose -f docker-compose.testprod.yml up --build
stop-preprod:
	docker compose -f docker-compose.testprod.yml down
