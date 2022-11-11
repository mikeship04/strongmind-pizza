class Pizza < ApplicationRecord
  validates :name, uniqueness: true

  has_many :toppings
end
