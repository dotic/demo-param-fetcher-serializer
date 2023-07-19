Cette présentation montre une fonction et la configuration utilisée par nos soins avec NestJS.
D'un niveau intermédiaire (voire avancé), les fonctions écrites permettent d'économiser l'écriture de nombreuses autres lignes de code.

Cela permet de montrer la puissance d'un framework comme NestJS et comment il est possible d'intégrer des fonctions grâce à des annotations.

# ParamFetcher & Serializer sur NestJS

Récupérer rapidement une entité de base de données grâce à un décorateur placé dans le code.
Retourner seulement les propriétés souhaitée de l'entité.
Cette factorisation de code permet de réduire considérablement les lignes de code, reste alors que quelques annonations de configuration.

https://github.com/dotic/demo-param-fetcher-serializer

- niveau : intermédiaire / avancé
- langage : javascript / nodejs
- license : opensource

## NestJS
NestJS est un framework backend pour monter rapidement une API,
en exploitant Express ou Fastify.
Après avoir cité ses avantages et ses inconvénients, nous présenterons un projet créé avec NestJS.

## ParamFetcher
Puis, nous dévoilerons une fonction qui s'intègre parfaitement dans NestJS, pour récupérer automatiquement les données d'une base.

ParamFetcher permet de convertir un endpoint de l'API en objet.
Ici, c'est un pipe de NestJS qui permet de faire une requête SQL pour récupérer l'entité souhaité automatiquement depuis une base de données.
 
Il est inspiré conceptuellement du [ParamConverter](https://symfony.com/bundles/SensioFrameworkExtraBundle/current/annotations/converters.html) de Symfony.

Grâce à NestJS, ParamFetcher, il est alors possible de faire de retourner un résultat d'API en 1 ligne (ex: app.controller.ts l44).

## Serializer
NestJS est grandement compatible avec la librairie [class-transformer](https://github.com/typestack/class-transformer), cette librairie permet de sérialiser des objets facilement.
Elle permet de créer d'exposer ou d'exclure des propriétés d'un objet, d'en calculer d'autres, d'avoir des règles d'exposition particulière.

Ici, nous montrerons comment accorder le "serializer" avec le "paramfetcher" afin de diffuser notre entité en JSON.
