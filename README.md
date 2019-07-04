# ToDoApp
Simple ToDoApp

## Prerequisites
Install:
1. SQL SERVER 2017 EXPRESS EDITION
2. Visual Studio 2017 or higher
3. Postman
4. .NET Core 2.2.0

### Creating Database

1. Inside Solution Explorer find and open 'appsettings.json'

2. Replace line "DbConnection" with your own connection string 
```
"DbConnection": "Server="your server";database="Dbname";"
```
3. Go to Tools -> NuGet Package Manager -> Package Manager Console

4. Make sure that Default project is set to "WebApi" and type belowed command 
```
Update-Database
```
### Running Application
1. Run WebApi using IIS Express
2. Open ToDoApp/WebApp/pages/index.html in browser

#### Testing Application
1. Open Postman
2. Change Method to Post
3. Insert link inside the bar
```
https://localhost:44325/api/AddPerson
```
4. Inside Body insert
```
  {
    "pesel": "97012548731",
    "name": "Janusz",
    "surname": "Fasola"
  }
```
5. Send request
6. To add new task fill required fields and type pesel number inside "Assigned to" field.
