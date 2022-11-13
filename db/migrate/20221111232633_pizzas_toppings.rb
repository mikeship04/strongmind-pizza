class PizzasToppings < ActiveRecord::Migration[7.0]
  def change
    table_exists?(:pizzas_toppings) ? nil : create_table :pizzas_toppings, id: false do |t|
      t.belongs_to :pizza
      t.belongs_to :topping
    end
  end
end
