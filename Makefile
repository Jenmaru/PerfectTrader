lint-frontend:
	make -C frontend lint

install:
	npm i

start:
	npx start-server -s ./frontend/build & make -C frontend start
	
build:
	npm run build
