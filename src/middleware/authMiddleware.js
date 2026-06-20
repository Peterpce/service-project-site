/**
 * REQUIRE LOGIN
 * Blocks access if user is not logged in
 */
export function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.flash("message", "You must be logged in first."); // ✅ Fixed key
    return res.redirect("/login");
  }
  next();
}

/**
 * REQUIRE ROLE (e.g. admin)
 * Blocks access if user does not have required role
 */
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.user) {
      req.flash("message", "You must be logged in first."); // ✅ Fixed key
      return res.redirect("/login");
    }

    if (req.session.user.role !== role) {
      req.flash("message", "Unauthorized access."); // ✅ Fixed key
      return res.redirect("/dashboard"); 
    }

    next();
  };
}