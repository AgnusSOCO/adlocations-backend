-- Photo Documentation table for before/after maintenance photos
CREATE TABLE IF NOT EXISTS photo_documentation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  structure_id INT NOT NULL,
  photo_type ENUM('before', 'after', 'inspection', 'damage') NOT NULL DEFAULT 'inspection',
  photo_url VARCHAR(500) NOT NULL,
  caption TEXT,
  taken_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  uploaded_by_user_id INT,
  metadata JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (structure_id) REFERENCES structures(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_structure_id (structure_id),
  INDEX idx_photo_type (photo_type),
  INDEX idx_taken_at (taken_at)
);
