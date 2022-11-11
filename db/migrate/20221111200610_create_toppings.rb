class CreateToppings < ActiveRecord::Migration[7.0]
  def change
    create_table :toppings do |t|
      t.string :topping

      t.timestamps
    end
  end
end
