// import {} from "src/html/components/dashboard/_sidenav";

const fs = require("fs");
const path = require("path");

describe("Side Nav Bar", () => {
  let html;
  beforeAll(() => {
    html = fs.readFileSync(
      path.resolve(__dirname, "../_sidenav.astro"),
      "utf8",
    );
  });

  beforeEach(() => {
    // Set up the DOM
    document.documentElement.innerHTML = html.toString();
  });

  test("should display the Navbar title", () => {
    const navTitle = document.getElementById("eventspark");
    expect(navTitle.textContent).toBe("EventSpark Menu");
  });

  test("should render the navigation list with correct items", () => {
    // Check if the nav list exists
    const navList = document.getElementById("navlist");
    expect(navList).not.toBeNull();

    // Check if the header is correctly rendered
    const navHeader = document.getElementById("eventspark");
    expect(navHeader).not.toBeNull();
    expect(navHeader.textContent).toBe("EventSpark Menu");

    // Check if the nav items exist and contain the correct content
    const navItems = navList.querySelectorAll(".nav-item");
    // expect(navItems.length).toBe(3); // 3 visible nav items (excluding the nested ones)

    // Verify each nav item content
    expect(navItems[0].querySelector("p").textContent.trim()).toBe("Check In");
    expect(navItems[1].querySelector("p").textContent.trim()).toBe("Events");
    expect(navItems[2].querySelector("p").textContent.trim()).toBe(
      "Manage Events",
    );
    expect(navItems[3].querySelector("p").textContent.trim()).toBe(
      "Administrator",
    );
    expect(navItems[4].querySelector("p").textContent.trim()).toBe("Manage Organizers");
  });
});
