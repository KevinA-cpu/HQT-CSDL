const config = {
    user: "sa",
    password: "datphan",
    server: "DATPHAN",
    options: {
        port: 1433,
        encrypt: false,
        database: "GiaoDoAnABC",
        // connectTimeout: 20000,
        // requestTimeout: 150000,
        enableArithAbort: true,
    },
    // pool: {
    //     max: 10,
    //     min: 5,
    //     idleTimeoutMillis: 3000,
    // },
};

export default config;
