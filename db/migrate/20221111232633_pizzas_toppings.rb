class PizzasToppings < ActiveRecord::Migration[7.0]
  def change
    create_table(:pizzas_toppings, if_not_exists: true) do |t|
      t.belongs_to :pizza
      t.belongs_to :topping
    end
  end
end
