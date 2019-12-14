var connection = require("./connection");
var Department = require("../Department");
var tables = require("../tables");

//fn: list product sales by department in a table
//    department_id | department_name | over_head_costs | product_sales | total_profit

//fn: return all departments as an array of objects
function getAll() {
    return new Promise(function(resolve, reject) {
        let departments = [];

        connection.query(
            "SELECT * FROM department",
            (err, result) => {
                if (err) {
                    reject(err);
                }
                result.forEach(department => {
                    departments.push(department);
                })
                resolve(departments);
            }
        )
    })
}

//fn: get a department by id

module.exports = {
    getAll: getAll
}