# Andi borrowings dictionary

This repository contains the first version of the web service for searching borrowed word in Andi languages of Nakh-Dagestani language family.

Currently, it only supports the search of words and all the information about them as the database is still in works. The website is available only in Russian for now, and there are plans for its version in English.

The service is supposed to find borrowed words in such languages as:

- Akhvakh
- Andi
- Bagvalal
- Botlikh
- Chamalal
- Godoberi
- Karata
- Tindi

## Quick start

To raise the service use:

`docker build . -f Dockerfile.web -t andi-borrowings-app/startup:latest`

`docker run -p 5000:5000 andi-borrowings-app/startup:latest`

which will build the image. You may not need to use these commands again.

Next you shall start the service with:

`docker compose up`

## Contacts

- [iphilatov](https://github.com/iphilatov)
- [anzhelikaminchenko](https://github.com/anzhelikaminchenko)
