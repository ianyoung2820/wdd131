// Activity 1 - Map > HTML list items 
const steps = ["one", "two", "three"];
const listTemplate = (step) => `<li>${step}</li>`;
const stepsHtml = steps.map(listTemplate);
// join with an empty string so there’s no commas between <li> elements
document.querySelector("#myList").innerHTML = stepsHtml.join("");


// Activity 2 - Map > letter grades to GPA points
const grades = ["A", "B", "A"];
function convertGradeToPoints(grade) {
  let points = 0;
  if (grade === "A") {
    points = 4;
  } else if (grade === "B") {
    points = 3;
  }
  return points;
}
const gpaPoints = grades.map(convertGradeToPoints);
console.log("GPA points array:", gpaPoints); 


// Activity 3 - Reduce > calculate average GPA 
const pointsTotal = gpaPoints.reduce((total, pts) => total + pts, 0);
const gpa = pointsTotal / gpaPoints.length;
console.log("Calculated GPA:", gpa); 


// Activity 4 - Filter > words shorter than 6 characters 
const words = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortWords = words.filter(word => word.length < 6);
console.log("Short words (<6 chars):", shortWords); 

// Activity 5 - indexOf > find the “lucky” number’s index 
const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
const luckyIndex = myArray.indexOf(luckyNumber);
console.log(`Index of ${luckyNumber}:`, luckyIndex); 