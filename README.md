# 5 денег

## Стек

Фронтенд: Next.js + Zustand + Apollo Client  
Бэкенд: Next.js + GraphQL Nexus  
База данных: Prisma + PostgerSQL

## Docker

1. Создать файл `.env` и прописать в нем `DATABASE_URL=postgresql://<ссылка на postgresql базу данных>`
2. `docker build -t nextjs-docker .`
3. `docker run -p 3000:3000 nextjs-docker`