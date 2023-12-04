install:
	cp .env.example .env
	docker build -t vietnam-laws-fe .
	docker run -p 3000:3000 vietnam-laws-fe