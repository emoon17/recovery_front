const transactionApi = {};

transactionApi.url = {};

// 거래 전체 조회
transactionApi.url.getAllTransactions = "/api/transaction/getAllTransactions";

// 거래 저장
transactionApi.url.insertTransaction = "/api/transaction/insertTransaction";

// 거래 수정
transactionApi.url.updateTransaction = "/api/transaction/updateTransaction";

export {transactionApi};