var isAdmin = localStorage.getItem("isAdmin");

// Crear el botón "Dashboard" solo si isAdmin es true
if (isAdmin === "true") {
    var dashboardNavItem = document.createElement("li");
    dashboardNavItem.className = "nav-item";
    dashboardNavItem.id = "dashboardNavItem";
    dashboardNavItem.style.display = "none";

    var dashboardNavLink = document.createElement("a");
    dashboardNavLink.className = "nav-link";
    dashboardNavLink.href = "../views/dashboard/dashboard.html";
    dashboardNavLink.target = "_top";
    dashboardNavLink.textContent = "Dashboard";

    dashboardNavItem.appendChild(dashboardNavLink);

    var navbarList = document.querySelector(".navbar-nav");

    navbarList.appendChild(dashboardNavItem);

    dashboardNavItem.style.display = "block";
}