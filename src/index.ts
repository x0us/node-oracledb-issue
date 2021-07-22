import OracleDB from './oracledb';
require('dotenv').config();

const main = async () => {
    await OracleDB.instance();

    let start = 0,  end = 10;

    const createdTable = await OracleDB.execute(
        `CREATE TABLE DEMO (
            NAME VARCHAR2(10),
            RATE NUMBER(4)
        )`
    )
    
    const insertData = await OracleDB.execute(
        `Insert into DEMO(NAME, RATE) values(:x, :y)`,
        {x: 'test', y: 10}
    )

    const pagination = await OracleDB.execute(
        `SELECT * FROM (SELECT A.*, ROWNUM RN FROM(SELECT * FROM DEMO WHERE RATE> 1) A WHERE ROWNUM <=:end) WHERE RN >=:start`,
        {start: start, end: end}
    )
    
    console.log('--------  no data -------------')
    console.log(pagination)
    console.log('--------  no data --------------')

    const useES6 = await OracleDB.execute(
        `SELECT * FROM (SELECT A.*, ROWNUM RN FROM(SELECT * FROM DEMO WHERE RATE> 1) A WHERE ROWNUM <=${end}) WHERE RN >=${start}`,
    )

    console.log('----------  got data --------------')
    console.log(useES6)
    console.log('---------  got data ---------------')
}

main()