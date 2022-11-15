class Pizza < ApplicationRecord
  has_and_belongs_to_many :toppings
  default_scope {order(name: :asc)}
  validates :name, uniqueness: true
end
