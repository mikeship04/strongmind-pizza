class CreatePizzas < ActiveRecord::Migration[7.0]
  def change
    create_table(:pizzas, if_not_exists: true) do |t|
      t.string :name

      t.timestamps
    end
  end
end
