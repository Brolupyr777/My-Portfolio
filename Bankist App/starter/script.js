"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: "Bohdan Lupyr",
  movements: [500, -50, 476, 700],
  interestRate: 0.5,
  pin: 4895,
};
const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  // Display Summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  // Prevent Form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1 && amount)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clearing out the text in the form
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ["a", "b", "c", "d", "e"];

// SLICE returns a copy of array starting and ending
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE is Slice but it mutates the original array
// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2); // number of elements to delete
console.log(arr);

// REVERSE also mutates
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT combines arrays
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(" - "));


// at method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log("Bohdan".at(0));
console.log("Bohdan".at(0));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(
      `Transaction Number: ${i + 1} | You deposited ${Math.abs(movement)}`
    );
  } else {
    console.log(
      `Transaction Number: ${i + 1} | You withdrew ${Math.abs(movement)}`
    );
  }
}

console.log("----- FOREACH -----");
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(
      `Transaction Number: ${i + 1} | You deposited ${Math.abs(mov)}`
    );
  } else {
    console.log(`Transaction Number: ${i + 1} | You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...


const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const newArrJulia = dogsJulia.slice(1, -2);
  const bothArrs = newArrJulia.concat(dogsKate);
  bothArrs.forEach(function (value, i) {
    if (value > 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${value} years old`);
    } else if (value <= 3) {
      console.log(
        `Dog number ${i + 1} is still a puppy🐕, and is only ${value} years old`
      );
    }
  });
};

checkDogs(juliaData, kateData);
console.log("----Data Two----");
checkDogs(juliaData2, kateData2);

const euroToUSD = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUSD;
});
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSD.push(mov * euroToUSD);
console.log(movementsUSDfor);

const moving = movements.map(function (mov, i) {
  return `Transaction ${
    i + 1
  }: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
});
console.log(moving);

const deposits = movements.filter((mov) => mov > 0);
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) deposits.push(mov);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);


// accumulator -> SNOWBALL
console.log(movements);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else if (mov > acc) {
    return mov;
  }
}, movements[0]);
console.log(max);

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(function (humanAge) {
//     if (humanAge <= 2) {
//       return (humanAge = 2 * humanAge);
//     } else {
//       return 16 + humanAge * 4;
//     }
//   });

//   const matureDogs = humanAge.filter(function (ages) {
//     return ages >= 18;
//   });
//   console.log(matureDogs);
//   const averageAge =
//     matureDogs.reduce((cur, acc) => cur + acc, 0) / matureDogs.length;
//   console.log(Math.round(averageAge));
// };
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
  console.log(avg1);
const euroToUSD = 1.1;

// PIPELINE
// Reduce does not return an array
const totalDepositsUSD = Math.round(
  movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * euroToUSD)
    .reduce((acc, cur) => acc + cur, 0)
);

console.log(totalDepositsUSD);


const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);


// Equality
console.log(movements.includes(-130));

// Some: Condition
const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

// Every
console.log(account4.movements.every((mov) => mov > 0));

// Separate
const deposit = (mov) => mov < 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);
// flat
const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce(function (acc, cur) {
    return cur + acc;
  });
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce(function (acc, cur) {
    return cur + acc;
  });
console.log(overalBalance2);


const owners = ["Jonas", "Bohdan", "Zach", "Adams"];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
movements.sort((a, b) => b - a);

// Empty Arrays + Fill Method
const x = new Array(7);
// console.log(x);
// console.log(x.map(()=> 5));

x.fill(1, 3, 5);
console.log(x);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);
});

// Exercises
// 1.
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2.
// const bigDeposits = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;
// console.log(bigDeposits);

const bigDeposits = accounts
  .flatMap((acc) => acc.movements)
  .reduce((sum, cur) => (cur >= 1000 ? ++sum : sum), 0);

// Prefixed ++ opperator
let a = 10;
console.log(++a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");

  return capitalize(titleCase);
};

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("bohdan's juicy steak"));
*/
// CODING CHALLENGE
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1.

dogs.forEach(function (dog) {
  const diet = Math.round(dog.weight ** 0.75 * 28);
  console.log(diet);
  dog.perfectDiet = diet;
});
console.log(dogs);

// 2.
console.log("================================");
// dogs.forEach(function (dog, i) {
//   const sarahDog = dog.owners.find((e) => e === "Sarah");
//   if (sarahDog.curFood > perfectDiet * 0.9) console.log(sarahDog);
//   i++;
// });
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));

if (sarahDog.curFood > sarahDog.perfectDiet) {
  console.log(`Sarah's Dog Is Eating Too Much`);
} else {
  console.log(`Sarah's Dog Is Eating Too Little`);
}
// 3.
console.log("===============================");
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.perfectDiet)
  .map((dog) => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.perfectDiet)
  .map((dog) => dog.owners)
  .flat();

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
// 4.
console.log("=========================");
const tooMuch = ownersEatTooMuch.join(" and ") + `'s dogs eat too much`;
const tooLittle = ownersEatTooMuch.join(" and ") + `'s dogs eat too little`;
console.log(tooMuch);
console.log(tooLittle);
// 5.
console.log("=======================");
const perfecto = dogs.map((dog) => dog.curFood === dog.perfectDiet);

console.log(perfecto);
console.log(perfecto.toString());
// 6.
console.log("===============================");
const okDiet = dogs.forEach((dog) => {
  console.log(
    dog.curFood >= dog.perfectDiet * 0.9 && dog.curFood <= dog.perfectDiet * 1.1
  );
});
// 7.
const goodDiet = dogs.find(
  (dog) =>
    dog.curFood >= dog.perfectDiet * 0.9 && dog.curFood <= dog.perfectDiet * 1.1
);
console.log(goodDiet);
// 8.
console.log("===============================");
const order = dogs
  .map((dog) => dog)
  .sort((a, b) => a.perfectDiet - b.perfectDiet);
console.log(order);
// movements.sort((a, b) => a - b);
