# Amber

Main: [![Build Status](https://travis-ci.com/magic-cal/BEAMBER.svg?branch=main)](https://travis-ci.com/magic-cal/BEAMBER) [![Known Vulnerabilities](https://snyk.io/test/github/magic-cal/BEAMBER/badge.svg)](https://snyk.io/test/github/magic-cal/BEAMBER) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/6d8c9f95ffc947bbaccf704e295b2416)](https://www.codacy.com/gh/magic-cal/BEAMBER/dashboard?utm_source=github.com&utm_medium=referral&utm_content=magic-cal/BEAMBER&utm_campaign=Badge_Grade)

A resource scheduling system for breweries and distilleries

`npm i` to install dependencies

`npm run serve` to run both client & server project concurrently

`npm run build` to build both client & server project to dist/

`npm run gen` to generate Swagger Doc, BE routes, FE api calls, Documentation

- Generation of types requires JAVA installed. Latest versions stored in Source Control

## Tecnical

Built with :

- Typescript
- Express
- Vuejs
- Fetch

## File Structure

- Server (BE)
  - app.ts (Entry Point and Server)
  - Services (All Data Services)
  - db
  - routes (express routes - generated)
  - util (BE Utils)
- Src (FE)
  _ Api - generated
  _ Componenets (Vue components that are reused)
  _ locales - Internationalisation
  _ Plugins
  _ Router
  _ Store
  _ Views (All pages here)
  _ App.vue (Entry Point)
- Utils (Shared utils)
  _ Classes (All Types for the data)  
   _ Swagger.json (Swagger Doc -generated )

  ![Planning Screen Example](https://github.com/magic-cal/BEAMBER/blob/main/src/assets/planning-screen.png)
