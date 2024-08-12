const moment = require("moment");

// // Original date
// const originalDate = moment("12-08-2024","DD-MM-YYYY").startOf('day').toISOString();
// console.log(`===  originalDate ===>>`, originalDate)

// // Add 86,400 seconds
// const newDate = moment(originalDate).add(86400, 'seconds').toISOString();
// console.log(`===  newDate ===>>`, newDate);

// =================CONVERT BACKN TO SECONDS=============

// const originalDate = moment("2024-08-11T18:30:00.000Z");
// console.log(`===  originalDate ===>>`, originalDate);
// const newDate = moment("2024-08-12T18:30:00.000Z");
// // const newDate = moment("2024-08-12T01:23:20.000Z");
// console.log("NEW DATE", newDate);

// const differenceInSeconds = newDate.diff(originalDate, "seconds");
// console.log(`=== differenceInSeconds ===>>`, differenceInSeconds);

console.log(moment().format());

let dateNow = moment().utc().format();
console.log(`===  dateNow ===>>`, dateNow)

let locale = moment.utc('2024-08-12T09:42:23Z').local().format();
console.log(`===  locale ===>>`, locale)

let a = null
if (!a) {
    console.log("HEHEH");
    
}

