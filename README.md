# Bike On Chain

![Bike On Chain](http://bike-on-chain.vercel.app/logo.png)

DApp permettant de gérer ses vélos sur la blockchain ! 

[Lien](http://bike-on-chain.vercel.app/).

## Mode développement

Ajouter le network hardhat à MetaMask :

- URL : http://127.0.0.1:8545/
- Chain ID : 31337
- Currency symbol : GO

```
> cd hardhat

> npm install

> npx hardhat compile
```

Copier les `*.json` des contrats présent après la compilation dans ***hardhat/artifacts/contracts/*** vers ***client/contrats/*** (ignorer les `*.dgb.json`).

```
> npx hardhat run scripts/deploy.js
```

Récupérer l'adresse du contrat après le déploiement et ajouter la clé `VITE_CONTRACT_ADDRESS` dans un fichier .env.local à la racine de ***client***.

````
VITE_CONTRACT_ADDRESS=clé_du_contrat
````

Lancer la commande suivante pour lancer le nœud hardhat et récupérer des comptes de test :

```
> npx hardhat node
```

Retourner à la racine du projet.

```
> cd client

> npm install

> npm run dev
```

La DApp est accessible en localhost !

## Mode production

Ajouter la clé `VITE_INFURA_KEY` dans le fichier .env.local à la racine de ***client***, correspondant à la clé pour le provider Infura.

````
VITE_CONTRACT_ADDRESS=clé_du_contrat
VITE_INFURA_KEY=clé_infura
````

Créer un fichier .env dans le dossier hardhat avec ces clés :

````
PRIVATE_KEY=clé_privée_metamask
PROVIDER_URL=url_provider
POLYGONSCAN_API_KEY=clé_polygonscan
````

La DApp marche sur le testnet Polygon Mumbai.

Pour déployer le contrat sur cette blockhain, il suffira d'ajouter `--network mumbai` à la commande de dépoloiement et de mettre à jour la clé `VITE_CONTRACT_ADDRESS`.