install:
	docker-compose -f ./api/docker-compose.builder.yml run --rm install && docker-compose -f ./angular-client/docker-compose.builder.yml run --rm install
start:
	docker-compose -f ./api/docker-compose.yml up && docker-compose -f ./angular-client/docker-compose.yml up