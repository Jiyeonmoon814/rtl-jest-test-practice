import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

it("shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // assert that the inputs are there
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
  // asserstion - make sure the compoenet is doing
  // what we expect it to do
});

it("calls onUserAdd when the form is submitted", () => {
  // not the best implementation, but it works
  // const argsList = [];
  // const callback = (...args) => {
  //   argsList.push(args);
  // };

  // mock function - doesn't do anything
  // records whenever it gets called, and the arguments it was called with
  // used when we need to make sure a component calls a callback
  const onUserAdd = jest.fn();

  // try to render the component
  render(<UserForm onUserAdd={onUserAdd} />);

  // find the two inputs
  // it's easy to break if the order is changed
  //const [nameInput, emailInput] = screen.getAllByRole("textbox");

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // simulate typing in a name
  userEvent.click(nameInput);
  userEvent.keyboard("jane");

  // simulate typing in an email
  userEvent.click(emailInput);
  userEvent.keyboard("jane@jane.com");

  // simulate pressing the enter key
  // userEvent.keyboard('{Enter}');

  // find the button
  const button = screen.getByRole("button");

  // simulate clicking the button
  userEvent.click(button);

  // assertion to make sure onuseradd was called
  expect(onUserAdd).toHaveBeenCalledWith({
    name: "jane",
    email: "jane@jane.com",
  });
});
