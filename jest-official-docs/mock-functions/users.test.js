// このテストはなぜかエラーが出て成功しないが、現時点ではテストの書き方がわかれば良いので一旦放棄する
// エラー内容：「SyntaxError: Cannot use import statement outside a module」
import axios from "axios";
import Users from "./users";

jest.mock("axios");

test("should fetch users", () => {
  const users = [{ name: "Bob" }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);

  return Users.all().then((data) => expect(data).toEqual(users));
});
