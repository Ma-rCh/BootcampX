const { Pool } = require('pg');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
// ORDER BY teacher;
// `)
const cohortName = process.argv[2];
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1 
ORDER BY teacher;
`;
// const queryString2 = 'Select 1' 
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.teacher} :${user.cohort}`);
    console.log(111);
  })
})
.catch(err => console.error('query error', err.stack));

