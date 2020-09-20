class MagicCard < ApplicationRecord
  belongs_to :user
  validates :name, :image_url, presence: true
  validates :name, uniqueness: {case_sensitive: false, message: "Name must be unique!"}
end
