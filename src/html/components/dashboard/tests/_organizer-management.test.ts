// import {} from "src/html/components/dashboard/_sidenav";

const fs = require("fs");
const path = require("path");

describe("Side Nav Bar", () => {
  let html;
  beforeAll(() => {
    html = fs.readFileSync(
      path.resolve(__dirname, "../../organizer-management/main.astro"),
      "utf8",
    );
  });

  beforeEach(() => {
    // Set up the DOM
    document.documentElement.innerHTML = html.toString();
  });

  test("should display the Page title", () => {
    const pageTitle = document.getElementById("pageTitle");
    console.log(pageTitle);
    expect(pageTitle?.textContent).toBe("Organizers");
  });

  test("should render the table containing organizers", () => {
    // Check if the dataTable exists
    const dataTable = document.getElementById("dataTable");
    expect(dataTable).not.toBeNull();
  });

  test("should render the toast", () => {
    // Check if the toast exists
    const toastSuccess = document.getElementById("toastSuccess");
    expect(toastSuccess).not.toBeNull();
  });

  test("should render the toast body content", () => {
    // Check if toastBody is correct
    const toastBody = document.getElementById("toastBody");
    expect(toastBody?.textContent?.trim()).toBe(
      "Hello, world! This is a toast message.",
    );
  });
});
