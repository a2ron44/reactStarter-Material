import { render, screen } from "@testing-library/react";
import App from "./App";

test("App starts and renders Campaign App text", () => {
  render(<App />);
  const linkElement = screen.getByText(/CampaignFi/i);
  expect(linkElement).toBeInTheDocument();
});
