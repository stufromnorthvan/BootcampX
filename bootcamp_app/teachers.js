const { Pool } = require('pg');

const pool = new Pool({
  user: 'stumitchell',
  password: '1234',
  host: 'localhost',
  database: 'bootcampx'
});

cohortName = process.argv[2] || 'JUL02'
values = [cohortName]

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${values[0]}'
ORDER BY teacher;
`

pool.query(queryString)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});