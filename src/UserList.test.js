import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    {
      name: "jane",
      email: "jane@jane.com",
    },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />);

  return {
    users,
  };
}

it("renders one row per user", () => {
  // render the component
  renderComponent();

  // html element
  // const { container } = render(<UserList users={users} />);

  // find all the rows in the table
  // screen.logTestingPlaygroundURL()
  // suggested query > screen.getByRole('row', { name: /jaine jane@jane\.com/i})
  // const rows = screen.getAllByRole("row"); // thead is included

  // element => role
  // thead, tbody => rowgroup
  // tr => row
  // th => columnheader
  // td => cell

  // two 'escape hatches' - ways to find elements when the preferred role approach doesn't work
  // way 1 - data-testid
  // <tbody data-testid="users">{renderedUsers}</tbody>
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // way 2 - container.querySelector()
  //const rows = container.querySelectorAll("tbody tr");

  // assertion : correct number of rows in the table
  expect(rows).toHaveLength(2);
});

it("renders the email and name of each user", () => {
  // render the component
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
