(() => {
  // Shortcut for document.querySelector
  const $ = sel => document.querySelector(sel);

  // Map of letter grades → points
  const gradeMap = { A: 4, B: 3, C: 2, D: 1, F: 0 };

  // Read, split, trim & uppercase the input string
  const getGrades = () =>
    $('#grades')
      .value
      .split(',')
      .map(g => g.trim().toUpperCase());

  // Compute average (with safe lookup and default of 0)
  const calculateGpa = grades => {
    const total = grades.reduce(
      (sum, g) => sum + (gradeMap[g] ?? 0),
      0
    );
    return grades.length
      ? (total / grades.length).toFixed(2)
      : '0.00';
  };

  // Display result
  const outputGpa = gpa => {
    $('#output').textContent = `GPA: ${gpa}`;
  };

  // Wire it up
  $('#submitButton').addEventListener('click', () => {
    const grades = getGrades();
    const gpa = calculateGpa(grades);
    outputGpa(gpa);
  });
})();
