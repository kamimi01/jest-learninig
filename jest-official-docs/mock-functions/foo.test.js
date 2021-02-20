// testを1つも書いていないため、failする
jest.mock("./foo.js");

const foo = require("./foo");

/**
 * モックの実装として使用される関数を受け取る
 */
foo.mockImplementation(() => 42);
foo();

/**
 * モック関数がmockImplementationOnceによって定義した実装を全て使い切った場合は、
 * jest.fn()のデフォルトの実装を実行する
 */
const myMockFn = jest
  .fn(() => "default")
  .mockImplementationOnce((cb) => cb(null, true))
  .mockImplementationOnce((cb) => cb(null, false));

myMockFn((err, val) => console.log(val));

myMockFn((err, val) => console.log(val));

myMockFn((err, val) => console.log(val));

/**
 * モック名をmockName()メソッドを使ってつけることが可能
 * テストでエラーとなったモック関数を迅速に特定するために使用
 */
const myMock2 = jest
  .fn()
  .mockReturnValue("defalt")
  .mockImplementation((scalar) => 42 + scalar)
  .mockName("add42");

/**
 * カスタムマッチャー
 *
 * モック関数がどのように呼ばれたかを調べるための機能
 */
// モック関数が呼ばれたか確認する
expect(myMock2).toHaveBeenCalled();
// モック関数が特定の引数を与えられて呼び出されたことを確認する
expect(myMock2).toHaveBeenCalledWith(arg1, arg2);
// 最後に呼び出されたモック関数が特定の引数を与えられて呼び出されたことを確認する
expect(myMock2).toHaveBeenLastCalledWith(arg1, arg2);
// 最新のスナップショットと一致することを確認する
expect(myMock2).toMatchSnapshot();
