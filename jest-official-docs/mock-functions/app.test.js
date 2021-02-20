const { TestScheduler } = require("jest");

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

// jest.fn(implementation)は、新しい、未使用のmock functionを返す
const mockCallback = jest.fn((x) => 42 + x);
forEach([0, 1], mockCallback);

// mock関数が2回呼ばれる（forEachメソッドの第一引数が2要素存在するので、その数だけメソッドが呼ばれているため）
test("using mock funtion test", () => {
  expect(mockCallback.mock.calls.length).toBe(2);

  /**
   * mockFn.mock.callsメソッドは、引数を配列の要素とした配列を返す（関数の実行結果とは別！！）
   */
  console.log(mockCallback.mock.calls); // [[0], [1]] が出力される
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  /**
   * mockFn.mock.resultsメソッドは、モック関数に対して行われた全ての呼び出しの結果を含む配列
   * typeプロパティとvalueプロパティを持つ
   *
   * typeプロパティは以下のいずれか
   * <li>return:正常終了したコールを示す</li>
   * <li>throw：値を返して呼び出しが完了したことを示す</li>
   * <li>incomplete：呼び出しがまだ完了していないことを示す</li>
   *
   * valueプロパティ
   * <li>typeプロパティの値がincompleteだった場合に、undefinedを返す</li>
   */
  console.log(mockCallback.mock.results); // [ { type: 'return', value: 42 }, { type: 'return', value: 43 } ]が出力
  expect(mockCallback.mock.results[0].value).toBe(42);
  expect(mockCallback.mock.results[1].value).toBe(43);
});

const myMock = jest.fn();
const a = new myMock();
const b = { name: "hoge" };
// bind()メソッドは、引数にthisや引数の値を指定することができる
const bound = myMock.bind(b);
bound();

test("mock property test", () => {
  /**
   * mockFn.mock.instancesメソッドは、newによってモック関数からインスタンス 化されたオブジェクトのインスタンス 全ての配列
   */
  console.log(myMock.mock.instances);
  expect(myMock.mock.instances.length).toBe(2);
  expect(myMock.mock.instances[1].name).toEqual("hoge");
});

const myMock2 = jest.fn();

const fileterTestFn = jest.fn();

/**
 * mockFn.mockReturnValueOnce()メソッドは、モック関数を1回呼び出した時に返す値を受け取る
 * 次のモック関数へのコールが異なる値を返せるように、チェーンすることができる
 * 使用できるmockReturnValueOnceの値がない場合は、mockReturnValueで設定された値を返す
 */
test("mock return test", () => {
  console.log(myMock2());

  myMock2
    .mockReturnValueOnce(10)
    .mockReturnValueOnce("x")
    .mockReturnValue(true);

  console.log(myMock2(), myMock2(), myMock2(), myMock2());

  fileterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  // filter() メソッドは、与えられた関数によって実装されたテストに合格したすべての配列からなる新しい配列を生成
  const result = [11, 12].filter((num) => fileterTestFn(num));

  console.log(result);
  console.log(fileterTestFn.mock.calls[0][0]);
  console.log(fileterTestFn.mock.calls[0][1]);
});
