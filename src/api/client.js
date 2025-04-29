const clientApi = {};

clientApi.url = {};

// test
clientApi.url.selectFindId = "/api/client/id";

// 거래처 전체 리스트 조회
clientApi.url.getAllClients = "/api/client/getAllClients"
// 거래처 수정
clientApi.url.updateClient = "/api/client/updateClient"
// 거래처 삭제
clientApi.url.deleteClient = "/api/client/deleteClient"

export {clientApi};