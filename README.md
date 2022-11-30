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
- Balance
- Deposit
- Withdraw
