class User < ApplicationRecord
    has_many :magic_cards
    has_secure_password
    validates :name, :username, :email, :password, presence: true
    validates :username, uniqueness: {case_sensitive: false, message: "%{attribute} has been already taken. Choose another %{username} "}
    validates :password, length: {manimum: 6, maximum: 15, message: "%{attribute} must be between 6 and 12 characters!"}
    validate :username, :cannot_be_vulgar
    def cannot_be_vulgar
        if username.downcase == "shit"
            errors.add(:username, "clean that shit up!")
        end
    end
end
