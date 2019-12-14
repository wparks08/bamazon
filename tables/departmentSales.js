var Table = require("cli-table");

function print(data) {
    let salesTable = new Table({
        head: ["ID", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"]
    });

    data.forEach(row => {
        salesTable.push([
            row.department_id,
            row.department_name,
            row.over_head_costs,
            row.product_sales,
            row.total_profit
        ]);
    });

    console.log(salesTable.toString());
}

module.exports = {
    print: print
}