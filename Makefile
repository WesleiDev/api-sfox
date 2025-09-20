up:
	docker compose up -d

down:
	docker compose down

log:
	docker logs --tail 100 -f test-api-sfox

exec:
	docker exec -it test-api-sfox sh

exec-mysql:
	docker exec -it database-test-api-sfox mysql -u root -proot123