// テストが失敗した場合の原因として、複数のテスト同士が干渉している場合がある
// .onlyをつけることで、一時的にそのテストのみを実行することが可能
beforeEach(() => {
  console.log("beforeEachした");
});

test.only("this will be the only test that runs", () => {
  expect(true).toBe(true);
});

test("this test will not run", () => {
  expect("A").toBe("B");
});
