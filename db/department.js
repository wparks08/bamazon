var connection = require("./connection");
var Department = require("../Department");
var tables = require("../tables");

//fn: list product sales by department in a table
//    department_id | department_name | over_head_costs | product_sales | total_profit
function listDepartmentSales(callback) {
    connection.query(
        `SELECT department.department_id, department_name, over_head_costs, SUM(p.product_sales) AS product_sales, (SUM(p.product_sales) - over_head_costs) AS total_profit
        FROM department
        JOIN product p on department.department_id = p.department_id
        GROUP BY department_name, department.department_id
        ORDER BY department.department_id;`,
        (err, result) => {
            if (err) {
                throw err;
            }

            tables.departmentSales.print(result);
            callback();
        }
    );
}

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

function insert(values, callback) {
    connection.query(
        "INSERT INTO department SET ?",
        values,
        (err, result) => {
            if (err) {
                throw err;
            }
            //do nothing
            callback();
        }
    )
}

module.exports = {
    listDepartmentSales: listDepartmentSales,
    getAll: getAll,
    insert: insert
}