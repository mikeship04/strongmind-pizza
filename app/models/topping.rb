class Topping < ApplicationRecord
  has_and_belongs_to_many :pizzas, dependent: :destroy
  default_scope {order(name: :asc)}
  validates :name, uniqueness: true
end
