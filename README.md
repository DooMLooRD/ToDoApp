# ToDoApp
Simple ToDoApp

## Prerequisites
Install:
SQL SERVER 2017 EXPRESS EDITION
Visual Studio 2017 or higher
.NET Core 2.2.0

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
2. Open in browser ToDoApp/WebApp/pages/index.html

#### Testing Application

You are provided with pesels assigned to two users.
If you wish to add new task you should use one of them:
```
11111111111
```
or
```
22222222222
```

