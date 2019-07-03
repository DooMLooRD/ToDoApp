# ToDoApp
Simple ToDoApp

## Prerequisites
SQL SERVER 2017 EXPRESS EDITION,
Latest version of Visual Studio 2019,
.NET Core 2.2.0,

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

