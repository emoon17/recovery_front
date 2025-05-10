const predictApi = {};

predictApi.url = {};

// 회수 지연 예측 전체 리스트 조회
predictApi.url.getAllPredicts = "/api/predict/getAllPredicts";

// high 레벨 리스트 메일전송
predictApi.url.sendTestMail = "/api/predict/sendTestMail";

export {predictApi};