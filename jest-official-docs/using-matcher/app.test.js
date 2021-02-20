// 一般的なMatcher
test("two plus two is four", () => {
  // toBeは厳密等価比較のために使用する
  expect(2 + 2).toBe(4);
});

test("Object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  // Objectの等価比較を行う場合は、toEqualを使用する
  expect(data).toEqual({ one: 1, two: 2 });
});

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 2; b < 10; b++) {
      // 等価とは逆のテストを行うことも可能
      expect(a + b).not.toBe(0);
    }
  }
});

// 真偽値
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// 数値
test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // 以下は丸め込みにより正しく動作しない
  // expect(value).toBe(0.3);
  // 以下は正しく動く
  expect(value).toBeCloseTo(0.3);
});

// 文字列
test("there is no I in team", () => {
  // 正規表現でマッチするかテスト
  expect("team").not.toMatch(/I/);
});

test("but there is a 'stop' in Christoph", () => {
  expect("Christoph").toMatch(/stop/);
});

// 配列と反復可能なオブジェクト
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk")
  // Setオブジェクトの生成（Setは重複する値を格納できない）
  expect(new Set(shoppingList)).toContain("milk")
})

// 例外
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK")
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow()
  expect(() => compileAndroidCode()).toThrow(Error)

  // エラーメッセージのチェックを行う（正規表現も使用可能）
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK")
  expect(() => compileAndroidCode()).toThrow(/JDK/)
})