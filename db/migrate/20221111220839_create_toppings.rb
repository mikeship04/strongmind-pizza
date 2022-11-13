class CreateToppings < ActiveRecord::Migration[7.0]
  def change
    table_exists?(:toppings) ? nil : create_table :toppings do |t|
      t.string :name

      t.timestamps
    end
  end
end
