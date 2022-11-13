class CreatePizzas < ActiveRecord::Migration[7.0]
  def change
    table_exists?(:pizzas) ? nil : create_table :pizzas do |t|
      t.string :name

      t.timestamps
    end
  end
end
