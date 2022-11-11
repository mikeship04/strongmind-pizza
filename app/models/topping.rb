class Topping < ApplicationRecord
  validates :topping, uniqueness: true
end
