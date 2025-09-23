# Makefile for the 'lib' directory

# Run Docker Container and rebuild
start: 
	docker compose up --build


# Run e2e Docker Container and rebuild
start-e2e:
	docker compose -f docker-compose.e2e.yml up --build


# Stop Docker Container
stop:
	docker compose down

# Remove Docker Container
remove:
	docker compose down --rmi all

# stop and run Docker Container
restart:
	$(MAKE) stop
	$(MAKE) start

# Run Docker Container for E2E Testing
test:
	docker compose -f docker-compose.e2e.yml up --build --abort-on-container-exit
	docker compose -f docker-compose.e2e.yml down

test-stop:
	docker compose -f docker-compose.e2e.yml down

# Purge Docker system: remove unused containers, volumes, networks, and dangling images
clean:
	docker system prune -f --volumes

ultra-clean:
	docker compose down -v --rmi all
	docker compose build --no-cache
	docker compose up --build


start-preprod:
	docker compose -f docker-compose.testprod.yml up --build
stop-preprod:
	docker compose -f docker-compose.testprod.yml down

# Launch codegen from playwright
codegen:
	npx playwright codegen http://localhost:3030

# Run Playwright tests
play:
	npx playwright test

play-report:
	npx playwright show-report

play-headed:
	npx playwright test --headed