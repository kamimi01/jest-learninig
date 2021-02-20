// 以下のテストコードはfetch関数の定義がないため、Failする

// コールバック
test("the data is peanut butter", () => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

// Promises
test("the data is peanut butter", () => {
  // Promiseを返すと、JestはPromiseがResolveされるまで待機する。rejectすると自動的にテストが失敗する
  return fetchData().then((data) => {
    expect(data).toBe("peanut butter");
  });
});

test("the fetch fails with an error", () => {
  // promiseのrejectを期待する場合は、想定した数のアサーションが呼ばれたことを確認するために、
  // expect.assertionsを呼ぶ
  expect.assertions(1);
  // promiseのrejectを期待する場合は、.catchメソッドを使用する
  return fetchData().catch((e) => expect(e).toMatch("error"));
});

test("the data is peanut butter", () => {
  // .resolvesのマッチャーを使用することもでき、JestはPromiseがresolveされるまで待機する
  // rejectされるとテストは自動的に失敗する
  return expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch data fails with an error", () => {
  // rejectされることを期待する場合は、.rejectマッチャーを使用する
  return expect(fetchData()).rejects.toMatch("error");
});

// Async/Await
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);

  try {
    await fetchData();
  } catch {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchData()).rejects.toThrow("error");
});
