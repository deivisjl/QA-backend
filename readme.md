<h1 align="center">
   QA - Backend
</h1>
<p align="center">
    <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/node-js-success?style=flat-square&logo=Node.js" alt="deivisjl-nodejs"/></a>
</p>
<p align="center">
    <a href="#"><img src="https://img.shields.io/github/followers/deivisjl?style=social" alt="deivisjl-followers"/></a>
    <a href="#"><img src="https://img.shields.io/github/stars/deivisjl/QA-backend?style=social" alt="deivisjl-stars"/></a>
    <a href="#"><img src="https://img.shields.io/github/forks/deivisjl/QA-backend?style=social" alt="deivisjl-forks"/></a>
</p>

## Modelos
```
sequelize model:create --name Usuarios --attributes nombre:string,correo:string
```

## Migracion

```
sequelize db:migrate
```

## Migracion Undo
```
sequelize-cli db:migrate:undo:all
```

## Seeder
```
sequelize seed:create --name users
```

## Execute Seeder
```
sequelize db:seed:all
```