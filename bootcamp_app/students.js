const { Pool } = require('pg');

const pool = new Pool({
  user: 'stumitchell',
  password: '1234',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2]
const limit = process.argv[3] || 5
values = [cohortName, limit]

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${values[0]}%'
LIMIT ${values[1]};
`

pool.query(queryString)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));