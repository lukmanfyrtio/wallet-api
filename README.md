# wallet-api

#Table


## Getting Ready
Clone the repo and follow the instructions. You can view each step by running these commands from the terminal.
1. Open your Maria DB.
2. Execute 
```
CREATE TABLE `accounts` (
  `id` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `balance` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```
3. Back to your repository folder,
```
npm install
```
3. To run the app,
```
npm run start
```

## API
- Register

`POST localhost:8080/register`
```shell
  curl -X POST localhost:8080/register
     -H 'Content-Type: application/json'
     -d '{
      "firstName":"lukman",
      "lastName":"fyrtio",
      "email":"fyrtio1@gmail.com",
      "password":"123"
  }'
   ```

### Response
```shell
HTTP/1.1 200 OK
connection: keep-alive
content-length: 145
content-type: application/json; charset=utf-8
date: Wed, 30 Nov 2022 17:05:10 GMT
etag: W/"91-4pzFBHS9G0og0NJyyNVvwCfjaWI"
keep-alive: timeout=5
x-powered-by: Express

{"timestamp":1669827910556,"code":200,"message":"You have created your Wallet account!","data":{"userId":"c0635a90-c84d-4885-b562-d392180e69a4"}}
   ```
- Deposit
`POST curl -X POST localhost:8080/deposit`
```shell
  curl -X POST localhost:8080/deposit
     -H 'Content-Type: application/json'
     -d '{
    "amount": 1.10900,
    "userId": "dddfdeec-72e9-450b-8954-3734ceb208b2"
}'
   ```

### Response
```shell
HTTP/1.1 200 OK
connection: keep-alive
content-length: 102
content-type: application/json; charset=utf-8
date: Wed, 30 Nov 2022 17:08:39 GMT
etag: W/"66-vrHc2k4WkpFdJ/Mt+ul2P14ZaFc"
keep-alive: timeout=5
x-powered-by: Express

{"timestamp":1669827833207,"code":200,"message":"Deposit successful! You have 3.109 in your account."}
   ```
- Withdraw
`POST curl -X POST localhost:8080/deposit`
```shell
  curl -X POST localhost:8080/withdraw
     -H 'Content-Type: application/json'
     -d '{
    "amount": 1.10900,
    "userId": "dddfdeec-72e9-450b-8954-3734ceb208b2"
}'
   ```

### Response
```shell
HTTP/1.1 200 OK
connection: keep-alive
content-length: 115
content-type: application/json; charset=utf-8
date: Wed, 30 Nov 2022 17:11:28 GMT
etag: W/"73-UDM+LCdQmIj25fUBjO8AA76qWik"
keep-alive: timeout=5
x-powered-by: Express

{"timestamp":1669828287607,"code":200,"message":"Withdraw  successful! You have withdrawed 0.891 in your account."}
   ```
- Balance
`POST curl -X GET localhost:8080/deposit`
```shell
  curl -X POST localhost:8080/withdraw
     -H 'Content-Type: application/json'
     -d '{
    "userId": "dddfdeec-72e9-450b-8954-3734ceb208b2"
}'
   ```

### Response
```shell
HTTP/1.1 200 OK
connection: keep-alive
content-length: 115
content-type: application/json; charset=utf-8
date: Wed, 30 Nov 2022 17:11:28 GMT
etag: W/"73-UDM+LCdQmIj25fUBjO8AA76qWik"
keep-alive: timeout=5
x-powered-by: Express

{"timestamp":1669825480591,"code":200,"message":"Success","data":{"id":"dddfdeec-72e9-450b-8954-3734ceb208b2","firstname":"lukman","lastname":"fyrtio","email":"fyrtio@gmail.com","password":"123","balance":0.891}}
   ```
