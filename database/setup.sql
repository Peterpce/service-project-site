-- =========================
-- ORGANIZATIONS TABLE
-- =========================
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(150)
);

-- =========================
-- PROJECTS TABLE
-- =========================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    organization_id INTEGER REFERENCES organizations(id)
);

-- =========================
-- CATEGORIES TABLE
-- =========================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- =========================
-- JUNCTION TABLE (MANY-TO-MANY)
-- PROJECTS ↔ CATEGORIES
-- =========================
CREATE TABLE project_categories (
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- =========================
-- SAMPLE DATA (OPTIONAL BUT HELPFUL)
-- =========================

INSERT INTO organizations (name, description, location)
VALUES 
('Helping Hands', 'Community service organization', 'Lagos'),
('Green Earth', 'Environmental protection group', 'Abuja');

INSERT INTO projects (name, description, start_date, end_date, organization_id)
VALUES
('Clean Water Project', 'Providing clean water to villages', '2025-01-01', '2025-06-01', 1),
('Tree Planting Drive', 'Planting trees across cities', '2025-02-01', '2025-07-01', 2);

INSERT INTO categories (name)
VALUES
('Health'),
('Environment'),
('Education'),
('Community Service');

-- Linking projects and categories
INSERT INTO project_categories (project_id, category_id)
VALUES
(1, 1),
(1, 4),
(2, 2);