import { execSelect, execUpdate } from "../src/database-helper.mjs";

function test_execSelectByFlowProcess() {
    const selectFlowProcess = "select * from flow_process";
    execSelect(selectFlowProcess)
        .then((result) => {
            console.log("data = ", result.data);
            console.log("fields = ", result.fields);
        });
}

function test_execInsertByFlowProcess() {
    const insertFlowProcess = `
        INSERT INTO flow_process(
                id, 
                process_code,
                process_name,
                process_enabled,
                process_type,
                start_node,
                created_by,
                created_dt,
                updated_by,
                updated_dt,
                is_deleted) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [420000, 'ACCOUNT_ACTIVE_42', '冻结账户柜台激活', 1, null, 420100, 'SYSTEM', new Date(), 'SYSTEM', new Date(), 0];
    execUpdate(insertFlowProcess, values)
        .then(rows => {
            console.log("effectRows = ", rows); 
        });
}

export {
    test_execSelectByFlowProcess,
    test_execInsertByFlowProcess
}