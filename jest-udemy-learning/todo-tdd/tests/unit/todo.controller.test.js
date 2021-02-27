const TodoConroller = require("../../controllers/todo.controller");
const TodoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  // 毎回のテストで初期化される
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("TodoConroller.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it("should have a createTodo function", () => {
    expect(typeof TodoConroller.createTodo).toBe("function");
  });

  it("should call TodoModel.create", () => {
    TodoConroller.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", () => {
    TodoConroller.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    // node-mocks-httpモジュールのメソッド
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", () => {
    TodoModel.create.mockReturnValue(newTodo);
    TodoConroller.createTodo(req, res, next);
    // node-mocks-httpモジュールのメソッド
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});
