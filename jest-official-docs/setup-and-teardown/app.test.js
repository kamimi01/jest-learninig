const { TestScheduler } = require("jest");

// テストごとにセットアップ作業を繰り返し実行する
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy;
});

beforeEach(() => {
  // 非同期のコードを扱うこともできる
  return initializeCityDatabase();
});

// ファイルの先頭で一度のみ実行される
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

// スコープ
describe("matching cities to foods", () => {
  // このdescribeブロック内のtestにのみ適用される
  beforeAll(() => {
    return initializeCityDatabase();
  });

  test("Vienna <3 sausage", () => {
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});

