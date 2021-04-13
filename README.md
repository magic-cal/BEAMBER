
# Amber

Main: [![Build Status](https://travis-ci.com/magic-cal/BEAMBER.svg?branch=main)](https://travis-ci.com/magic-cal/BEAMBER) Dev: [![Build Status](https://travis-ci.com/magic-cal/BEAMBER.svg?branch=dev)](https://travis-ci.com/magic-cal/BEAMBER) Vulnerabilities: [![Known Vulnerabilities](https://snyk.io/test/github/magic-cal/BEAMBER/badge.svg)](https://snyk.io/test/github/magic-cal/BEAMBER)

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
* Server (BE)
    * app.ts (Entry Point and Server)
    *  Services (All Data Services)
    * db
    * routes (express routes - generated)
    * util (BE Utils) 
* Src (FE)
	* Api - generated
	* Componenets (Vue components that are reused)
	* locales - Internationalisation 
	* Plugins 
	* Router
	* Store
	* Views (All pages here) 
	* App.vue (Entry Point)
* Utils (Shared utils)
	* Classes (All Types for the data)  
	* Swagger.json (Swagger Doc -generated )
![alt text](https://github.com/magic-cal/BEAMBER/blob/main/src/assets/planning-screen.png)
