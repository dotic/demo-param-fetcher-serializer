# ParamFetcher & Serializer sur NestJS

Récupérer rapidement une entité de base grâce à un décorateur depuis une API.
Retourner seulement les propriétés souhaitée de l'entité.

Niveau: intermédiaire / avancé

## NestJS
NestJS est un framework backend pour monter rapidement une API,
en exploitant Express ou Fastify.

## ParamFetcher
ParamFetcher permet de convertir un endpoint de l'API en objet.
ParamFetcher est un pipe de NestJS qui permet de faire une requête SQL pour récupérer l'entité souhaité automatiquement depuis une base de données.
 
Il est inspiré conceptuellement du [ParamConverter](https://symfony.com/bundles/SensioFrameworkExtraBundle/current/annotations/converters.html) de Symfony.

Grâce à NestJS, ParamFetcher et TypeORM, il est alors possible de faire de retourner un résultat d'API en 1 ligne (ex: app.controller.ts l44).

## Serializer
NestJS est grandement compatible avec la librairie [class-transformer](https://github.com/typestack/class-transformer), cette librairie permet de sérialiser des objets facilement.
Il permet de créer des propriétés calculées, d'exposer ou d'exclure des propriétés, etc.

Grâce à NestJS, ParamFetcher et TypeORM, il est alors possible de retourner un résultat de seulement les propriétés souhaitées.
