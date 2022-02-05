Witam!
Prosta aplikacja budująca obraz dockera i publikująca zawartość w aplikacji webowej stworzonej wystawionej przez Azure.

## **Prerekwizyty:**

System operacyjny: Ubuntu
Zainstalowany AzureCLI (instrukcja poniżej)

Zainstalowany Docker (instrukcja poniżej)

Zainstalowany GIT (instrukcja poniżej)

## **1. Instalacja prerekwizytów:**

###    **1.1 AzureCLI w terminalu należy uruchomić następujący wiersz**
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    
###   1.2 Docker instalowany jest za pomocą poniższych poleceń:
    apt-get update ;
    apt-get install -qq apt-transport-https ca-certificates curl software-properties-common ;
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - ;
    add-apt-repository 'deb [arch=amd64] https://download.docker.com/linux/ubuntu '$(lsb_release -cs)' stable' ;
    apt-get update ;
    apt-get install -qq docker-ce ;
    
###   1.3 GIT instalowany jest za pomocą:
    apt-get install git
    
## 2. Tworzenie zasobów oraz budowa aplikacji.2. Tworzenie zasobów oraz budowa aplikacji.

### 2.1 Tworzenie grupy zasóbów za pomocą AzureCLI  2.1 Tworzenie grupy zasóbów za pomocą AzureCLI
    az group create --name NazwaGrupy --location eastus

### 2.2 Tworzenie rejestru kontenerów potrzebnego do publikacji kontenera  2.2 Tworzenie rejestru kontenerów potrzebnego do publikacji kontenera
    az acr create --resource-group NazwaGrupy --name NazwaRejestru --sku Basic
NOTE: Po zbudowaniu rejestru zapamiętaj **LoginServer**, który będzie potrzebny w kolejnych krokach n.p mojanazwarejestru.azurecr.io


### 2.3 Klonowanie repozytorium z wymaganymi plikami konfiguracyjnymi oraz dockerfile'm  2.3 Klonowanie repozytorium z wymaganymi plikami konfiguracyjnymi oraz dockerfile'm
    git clone https://github.com/KordianMikolajczyk/AzureDockerApp.git

### 2.4 Budowa obrazu dockera (docker image)  2.4 Budowa obrazu dockera (docker image)
    sudo docker build -t **LoginServer**/_nazwa_obrazu_:latest . 

### 2.5 Lokalny test aplikacji  2.5 Lokalny test aplikacji
    sudo docker run -d -p 8080:4000 **LoginServer**/_nazwaobrazu_

 W przeglądarce WWW należy uruchomić:
 localhost:8080

## 3 Publikacja aplikacji za pomocą Azure
### 3.1 Zalogowanie się do rejestru kontenerów  3.1 Zalogowanie się do rejestru kontenerów
    docker login LoginServer
      username:(twój prywatny login [najczęściej host])
      password (twoje prywatne hasło wygenerowane przez Azure)
      docker push LoginServer/_nazwa_obrazu_:latest

## 4. Budowanie planu aplikacji
	az appservice plan create --name MyPlan --resource-group KordianDocker

## 5. Budowanie aplikacji
	az webapp create --plan MyPlan --resource-group KordianDocker --docker-registry-server-user KordianContainerRegistry --docker-registry-server-password SomePassword --name MyApp

Aplikacja wyciągnie z rejestru kontenerów obraz który się tam znajduje i zostanie on opublikowany pod adresem:
**MyApp**.azurewebsites.net


